<template>

  <div class="nav-wrap">
    <h1 class="site-title">B<span>ad</span> M<span>ovie</span> S<span>quad</span></h1>

    <nav class="nav">
      <ul>
        <li><a href="#upcoming">Upcoming</a></li>
        <li><a href="#backlog">To watch</a></li>
        <li><a href="#watched">Watched</a></li>
        <li><a href="#scoreboard">Scoreboard</a></li>
        <li><a href="#rules">Rules</a></li>
      </ul>
    </nav>

    <div class="user-actions">
      <Search/>

      <div class="user-actions__user">
        
        <button class="btn btn--mini logout" v-on:click="logout">Log out</button>
      </div>
    </div>

  </div>
</template>

<script>
import firebase from 'firebase'
import Search from './Search.vue'

export default {
  name: 'Nav',

  components: {
    Search
  },

  methods: {
    logout: () => {
      var definitelyLogout = !!confirm('Log out for real?');
      if (definitelyLogout) {
        firebase.auth().signOut()
      }
    }
  },
}
</script>
