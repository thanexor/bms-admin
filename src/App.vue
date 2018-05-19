<template>
    <div id="app">
      <Nav/>

      <div class="main">

        <Upcoming />
        <Picks />
        <List />
        <Watched />
        <Scores />
        <Rules />

      </div>
    </div>
</template>

<script>
import * as firebase from 'firebase';

import Nav from './components/Nav.vue'
import Upcoming from './components/Upcoming.vue'
import List from './components/List.vue'
import Watched from './components/Watched.vue'
import Scores from './components/Scores.vue'
import Rules from './components/Rules.vue'
import Picks from './components/Picks.vue'

export default {
    name: 'App',

    components: {
        Nav,
        Upcoming,
        List,
        Watched,
        Scores,
        Rules,
        Picks
    }
}
</script>

<style lang="scss">
  @import 'styles/app.scss'
</style>
