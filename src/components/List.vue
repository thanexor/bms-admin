<template>
    <section class="subsection" id="backlog">
    <h2>To watch <small>{{ movies.length }} movies -- {{ defaultPointCost }} points to make a pick</small></h2>

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
        }
    },

    methods: {
        fetchMovies: function () {
            var db   = firebase.firestore(),
                results = [];

            db.collection("Movies").orderBy('title', 'asc').get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {

                    var movieDoc = doc.data();

                    movieDoc.url    = "https://www.themoviedb.org/movie/" + movieDoc.id;
                    movieDoc.baseId = doc.id;

                    // Probably a better way to do this
                    if (movieDoc.backdrop_path === null) {
                        movieDoc.background_url = 'https://image.tmdb.org/t/p/w300/' + movieDoc.poster_path;
                    } else {
                        movieDoc.background_url = 'https://image.tmdb.org/t/p/w300/' + movieDoc.backdrop_path;
                    }

                    db.collection('Users').doc(''+movieDoc.added_by).get().then(function(querySnapshot) {
                        var userData = querySnapshot.data();

                        movieDoc.added_by_name = userData !== undefined ? userData.displayName : 'someone';
                        movieDoc.added_by_id = userData !== undefined ? userData.uid : 13371337;

                        // Only push after this finishes
                        results.push(movieDoc);
                    });
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

            // console.log(movie.title);
            // console.log(this.currentUser.displayName);


            if (add) {
                const makePick = firebase.functions().httpsCallable('makePick');
                makePick(data).then(result => {
                    // Send message to Discord
                    this.dwh.custom("WILLARD THE ROBOT COP", "" + movie.title + " was just picked by " + this.currentUser.displayName + '!', "PICK MADE", "#f0407b");
                    alert('Successfully picked ' + movie.title + '!');
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
            console.log("Couldn't get Discrd key!", error);
        });
    }
}
</script>
