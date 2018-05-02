<template>
    <div id="app">
        <p>
            <router-link to="/">Foo</router-link>
            <router-link to="/foo2">Foo 2</router-link>
        </p>
        <router-view></router-view>

        <button v-on:click="logout">Logout</button>
    </div>
</template>

<script>
import * as firebase from 'firebase';

export default {
  name: 'app',

  methods: {
    logout: () => {
      firebase.auth().signOut()
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
