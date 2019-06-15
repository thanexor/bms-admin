<template>
    <section class="subsection" id="backlog">
    <h2>To watch <small>{{ movies.length }} movies in backlog, {{ defaultPointCost }} points to make a pick</small></h2>

    <ul class="backlog">
        <li class="backlog__movie" v-for="movie in movies" v-bind:key=movie.id v-bind:style="{ 'background-image': 'url(' + movie.background_url + ')' }">
            <div class="backlog__movie__meta">
                <h3><a v-bind:href="movie.url" rel="external">{{ movie.title }}</a></h3>
                <p v-bind:data-id="movie.added_by_id">Added by {{ movie.added_by_name }}</p>
            </div>
            <button class="backlog__movie__control" v-on:click="makePick(movie)" v-bind:disabled="currentUser.total_points < defaultPointCost">
                <span v-if="currentUser.total_points >= defaultPointCost">Pick</span>
                <span v-if="currentUser.total_points < defaultPointCost">Need points</span>
            </button>
        </li>

        <li class="backlog__movie backlog__movie--add">
            <button class="btn btn--full" v-on:click="addFromList">+ Add a movie</button>
        </li>
    </ul>

    <div class="overlay overlay--modal" v-bind:class="{ 'overlay--is-visible': !!pickLoadingVisible }">
        <div class="overlay__inner">
            <h2>Picking {{ pickTitle }}</h2>
            <p>Sometimes this takes 10+ seconds</p>
            <img src="images/breen-loading.gif" />
        </div>
    </div>

    </section>
</template>

<script>
import firebase from 'firebase'
import DscrdWebhooks from 'webhook-discord'

export default {
    name: 'List',

    data: function () {
        return {
            movies: [],
            currentUser: null,
            defaultPointCost: window.Global.defaultPointCost,
            dwh: null,
            pickLoadingVisible: false,
            pickTitle: 'Dickbutt',
        }
    },

    methods: {
        fetchMovies: function () {
            var db   = firebase.firestore(),
                watchedRefIds = [],
                results = [];

            // Build array of watched film IDs, to exclude from all backlog movies
            db.collection('Picks').where("state", "==", "completed").get().then(picks => {
                picks.forEach(pick => {
                    watchedRefIds.push(pick.data().movie.id);
                })
            });

            db.collection("Movies").orderBy('title', 'asc').get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {

                    var movieDoc = doc.data();

                    // Compare watched movie IDs from picks to all backlog IDs
                    // Only add it if it was never picked and marked 'completed'
                    if (watchedRefIds.indexOf(doc.id) === -1) {
                        movieDoc.url    = "https://www.themoviedb.org/movie/" + movieDoc.id;
                        movieDoc.baseId = doc.id;

                        // Probably a better way to do this
                        if (movieDoc.backdrop_path !== null) {
                            movieDoc.background_url = 'https://image.tmdb.org/t/p/w300/' + movieDoc.backdrop_path;
                        } else if (movieDoc.poster_path !== null) {
                            movieDoc.background_url = 'https://image.tmdb.org/t/p/w300/' + movieDoc.poster_path;
                        } else {
                            movieDoc.background_url = '';
                        }

                        db.collection('Users').doc(''+movieDoc.added_by).get().then(function(querySnapshot) {
                            var userData = querySnapshot.data();

                            movieDoc.added_by_name = userData !== undefined ? userData.displayName : 'someone';
                            movieDoc.added_by_id = userData !== undefined ? userData.uid : 13371337;

                            // Only push after this finishes
                            results.push(movieDoc);
                        });
                    }
                });
            });

            this.movies = results;
        },
        addFromList: function () {
            var searchField = document.getElementById('js-search-field');
            searchField.focus();
        },
        makePick: function (movie) {
            var add   = !!confirm('Are you sure you want to pick ' + movie.title + '?');

            const data = {
                movieId: movie.baseId
            }

            if (add) {
                this.pickLoadingVisible = true;
                this.pickTitle = movie.title;

                const makePick = firebase.functions().httpsCallable('makePick');

                this.pickLoadingVisible = false;
                makePick(data).then(() => {
                    // Send message to Discord
                    var message = "[" + movie.title + "](" + movie.url + ") was just picked by " + this.currentUser.displayName + '!\n\n More @ [ badmoviesquad.com](https://badmoviesquad.com)';

                    // this.dwh.custom("WILLARD THE ROBOT COP", message, "PICK MADE", "#f0407b");
                    window.location.reload(true);
                });
            }
        }
    },
    created: function () {
        this.fetchMovies();

        var vm = this;
        var db = firebase.firestore();

        db.collection("Keys").doc("discord-bot").get().then(function(doc) {
            if (doc.exists) {
                // this is all janked up because some dickbutt spammed our channel
                // probably doesn't make a difference but oh well
                vm.dwh = new DscrdWebhooks('h'+'t'+'tps'+':'+'/'+'/dis'+'cor'+'dapp.c'+'om/a'+'pi/we'+'bhooks'+'/'+'460900246398959617/' + doc.data().id);
            }
        }).catch(function(error) {
            console.log("Couldn't get Discord key!", error);
        });
    }
}
</script>
