<template>
    <div id="login">
        <div class="">
            <h1 class="site-title">B<span>ad</span> M<span>ovie</span> S<span>quad</span></h1>
            <button class="btn" v-on:click="signin">Sign in with Google</button>
            <small>We don't read or store any personal data -- we just use it for authentication.</small>
        </div>
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
