<template>

  <div class="col-side">
    <h1 class="site-title">Bad Movie Squad</h1>

    <Search/>

    <nav class="side-nav">
      <ul>
        <li><a href="#upcoming">Upcoming</a></li>
        <li><a href="#backlog">List</a></li>
        <li><a href="#watched">Watched</a></li>
        <li><a href="#scoreboard">Scoreboard</a></li>
        <li><a href="#rules">Rules</a></li>
      </ul>
      <div class="actions">
        <button class="btn btn--full" v-on:click="logout">Log out</button>
      </div>
    </nav>
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
      firebase.auth().signOut()
    }
  },
}
</script>
