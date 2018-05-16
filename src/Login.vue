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
            firebase.auth().signInWithRedirect(provider)
        }
    }
}
</script>
