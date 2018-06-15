<template>

  <div class="nav-wrap" v-bind:class="{ 'is-open-burger': isBurgerOpen }">
    <div class="nav-wrap--mobile">
      <div class="nav-wrap__overlay" v-on:click="toggleBurger"></div>

      <button class="burger" v-on:click="toggleBurger">
        <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjMycHgiIGhlaWdodD0iMzJweCIgdmlld0JveD0iMCAwIDEyNCAxMjQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDEyNCAxMjQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNMTEyLDZIMTJDNS40LDYsMCwxMS40LDAsMThzNS40LDEyLDEyLDEyaDEwMGM2LjYsMCwxMi01LjQsMTItMTJTMTE4LjYsNiwxMTIsNnoiIGZpbGw9IiNGRkZGRkYiLz4KCTxwYXRoIGQ9Ik0xMTIsNTBIMTJDNS40LDUwLDAsNTUuNCwwLDYyYzAsNi42LDUuNCwxMiwxMiwxMmgxMDBjNi42LDAsMTItNS40LDEyLTEyQzEyNCw1NS40LDExOC42LDUwLDExMiw1MHoiIGZpbGw9IiNGRkZGRkYiLz4KCTxwYXRoIGQ9Ik0xMTIsOTRIMTJjLTYuNiwwLTEyLDUuNC0xMiwxMnM1LjQsMTIsMTIsMTJoMTAwYzYuNiwwLDEyLTUuNCwxMi0xMlMxMTguNiw5NCwxMTIsOTR6IiBmaWxsPSIjRkZGRkZGIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" />
      </button>

      <h1 class="site-title">B<span>ad</span> M<span>ovie</span> S<span>quad</span></h1>
    </div>

    <div class="nav-wrap--large">
      <h1 class="site-title site-title--main">B<span>ad</span> M<span>ovie</span> S<span>quad</span></h1>

      <nav class="nav">
        <ul>
          <li><a href="#upcoming">Upcoming</a></li>
          <li><a href="#backlog">To watch</a></li>
          <li><a href="#scoreboard">Scoreboard</a></li>
          <li><a href="#watched">Watched</a></li>
          <li><a href="#rules">Rules</a></li>
          <li v-if="currentUser.admin === true"><a href="#admin">Admin</a></li>
        </ul>
      </nav>

      <div class="user-actions">
        <Search/>

        <div class="user-controls">
          <div class="user-controls__user">
            <img src="" v-bind:src="currentUser.photoURL" />
            <span>{{ currentUser.displayName }} -- <small>{{ currentUser.total_points }} pts</small></span>
          </div>
          <button class="btn btn--mini logout" v-on:click="logout">Log out</button>
        </div>
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

  data: function () {
    return {
      isBurgerOpen: false,
      currentUser: {
        admin: false
      }
    }
  },

  methods: {
    logout: () => {
      var definitelyLogout = !!confirm('Log out for real?');
      if (definitelyLogout) {
        firebase.auth().signOut()
      }
    },
    toggleBurger: function () {
      this.isBurgerOpen = !this.isBurgerOpen;
    }
  },

  created: function () {
    // this.currentUser = currentUser;
  }
}
</script>
