<template>
    <div id="app">
      <div class="col-side">
        <h1 class="site-title">Bad Movie Squad</h1>
        <nav class="side-nav">
          <ul>
            <li><a href="#" class="active">Next up</a></li>
            <router-link to="/dashboard">To Watch</router-link>
            <router-link to="/dashboard">Watched</router-link>
            <router-link to="/dashboard">Scoreboard</router-link>
            <router-link to="/dashboard">Rules</router-link>
          </ul>
        </nav>
        <button v-on:click="logout">Logout</button>
      </div>

      <div class="col-main">
        <h1>Bad Movie Squad STATZ</h1>
        <router-view></router-view>
      </div>
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

<style lang="scss" scoped>
  @import 'styles/app.scss'
</style>
