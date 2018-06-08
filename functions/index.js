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
    if (change.data().state === "closed") {
        // get picks from night
        // search for UserPicks that match the picks
        // from the user pick subtract the pick points from the user's total points

        // get users from the Night
        // add points to the users total_points

        // set the pick/night to completed

        // create new night?
    }
});

exports.toggleAttendance = functions.https.onCall((data, context) => {
    const db      = admin.firestore();
    const uid     = context.auth.uid;
    const nightId = data.nightId;

    // var night = admin.firestore().doc('Night/' + nightId),
    //     user = admin.firestore().doc('Users/' + uid)

    // return admin.firestore().collection('Nights').doc(nightId).get().then(night => {

    //     console.log('attendRefs', attendeeRefs);
    //     // update the users array after getting it from Firestore.
    //     const newAttendee = night.get('attendees').push(newUid);
    //     t.set(householdRef, { users: newUserArray }, { merge: true });
    //     // attendeeRefs.forEach(function(attendeeRef) {
    //     //     attendeeIds.push(attendeeRef.ref.segments[1])
    //     // });

    //     // console.log('uid', uid)
    //     // console.log('att', attendeeIds)
    //     // console.log('includes?', attendeeIds.includes(uid));
    //     // if (!attendeeIds.includes(uid)) {
    //     //     attendeeRefs.p
    //     // }

    //     return { isAttending: true }
    // });


    // Create a reference to the SF doc.
    var nightRef = db.collection('Nights').doc(nightId)
        userRef = db.collection('Users').doc(uid)

    return db.runTransaction(function(transaction) {
        // This code may get re-run multiple times if there are conflicts.
        return transaction.get(nightRef).then(function(nightDoc) {
            if (!nightDoc.exists) {
                console.log('No Night Document')
            }

            var newAttendees = nightDoc.get('attendees').push(userRef)

            transaction.set(nightRef, { attendees: newAttendees }, { merge: true });
            return { isAttending: false}
        });
    }).then(function() {
        console.log("Transaction successfully committed!");
        return { isAttending: true }
    }).catch(function(error) {
        console.log("Transaction failed: ", error);
    });
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
    const uid      = context.auth.uid,
          movieId  = data.movieId

    return admin.firestore().collection('Picks').add({
        movie: admin.firestore().collection('Movies').doc(movieId),
        picker: admin.firestore().collection('Users').doc(uid),
        state: "pending",
        total_points: 3
    }).then(() => {
        return {test: true}
    })
});
