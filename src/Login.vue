<template>
    <div id='login'>
        <button v-on:click='signin'>Google Sign-In</button>
    </div>
</template>

<script>
import * as firebase from 'firebase'

export default {
  name: 'Login',

  methods: {
      signin: () => {
          var provider = new firebase.auth.GoogleAuthProvider()
          firebase.auth().signInWithRedirect(provider).then(
              function(result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                console.log('user', user);
              }
          ).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
              });
      }
  }
}
</script>
