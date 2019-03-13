const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

exports.completeNight = functions.firestore.document('Nights/{nightId}').onUpdate((change, context) => {
    const prevNight = change.before.data();
    const curNight = change.after.data();

    var now = new Date(),
        nextNight = now.setDate(now.getDate() + (3+(7-now.getDay())) % 7)
        timestamp = new admin.firestore().Timestamp(nextNight);

    if (prevNight.state === "pending" && curNight.state === "completed") {
        // create new night
        let now = new Date(),
            dateOpts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour:"numeric", timeZone:'short' };

        now.setDate(now.getDate() + (3+(7-now.getDay())) % 7); // Set to the new wednesday

        return admin.firestore().collection('Nights').add({
            location: "TDB",
            slots: 2,
            date: timestamp,
            state: "pending",
            title: "TBD",
        })
        // deduct 3 points from the pickers
    }
});

exports.toggleAttendance = functions.https.onCall((data, context) => {
    const db      = admin.firestore();
    const uid     = context.auth.uid;
    const nightId = data.nightId;

    console.log('USER:', db.doc('Users/' + uid));
    return db.collection('Users').doc(uid).get(user => {
        console.log('user?: ', user.data());
     }).then(() =>{
        return { isAttending: true }
    })
});

exports.getAttendance = functions.https.onCall((data, context) => {
    const uid     = context.auth.uid
    const nightId = data.nightId

    return admin.firestore().collection('Nights').doc(nightId).get().then(night => {
        var attendeeRefs   = night.data().attendees,
            attendeeIds = [];

        attendeeRefs.forEach(function(attendeeRef) {
            attendeeIds.push(attendeeRef.ref.segments[1])
        });

        console.info('User ' + uid + ' attending? ' + attendeeIds.includes(uid))
        return { isAttending: attendeeIds.includes(uid) };
    })

});

exports.makePick = functions.https.onCall((data, context) => {
    const email      = context.auth.token.email,
          movieId  = data.movieId

    var movie = admin.firestore().collection('Movies').doc(movieId)

    console.log('Auth', context.auth.token.email);
    return admin.firestore().collection('Picks').add({
        movie: admin.firestore().collection('Movies').doc(movieId),
        picker: admin.firestore().collection('Users').doc(email),
        state: "active",
        total_points: 3
    }).then(() => {
        return {test: true}
    });
});
