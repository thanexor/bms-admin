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
    if (change.data().state == "closed") {
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
    const uid = context.auth.uid;
});
