<template>
    <div id="app">
      <Nav/>

      <div class="col-main">
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
import * as firebase from 'firebase';

import Nav from './components/Nav.vue'

export default {
  name: 'App',

  methods: {
    logout: () => {
      firebase.auth().signOut()
    }
  },

  components: {
    Nav
  },
}
</script>

<style lang="scss">
  @import 'styles/app.scss'
</style>
