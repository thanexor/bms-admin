<template>
    <div id="app">
        <Nav/>

        <div class="main">

            <Upcoming />
            <List />
            <Scores />
            <Watched />
            <Rules />

          </div>
    </div>
</template>

<script>
import firebase from 'firebase'

import Nav from './components/Nav.vue'
import Upcoming from './components/Upcoming.vue'
import List from './components/List.vue'
import Watched from './components/Watched.vue'
import Scores from './components/Scores.vue'
import Rules from './components/Rules.vue'

export default {
    name: 'App',

    components: {
        Nav,
        Upcoming,
        List,
        Watched,
        Scores,
        Rules
    },

    created: function () {
        window.Global = {};
        var G = {};

        const db = firebase.firestore();
        const settings = {timestampsInSnapshots: true};
        db.settings(settings);

        G.defaultPointCost = 3;

        // Set global values
        window.Global = G;
    }
}

</script>

<style lang="scss">
  @import 'styles/app.scss'
</style>
