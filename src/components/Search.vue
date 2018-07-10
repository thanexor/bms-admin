<template>
    <section role="search" class="search">

        <div class="search__box">
            <input id="js-search-field" class="input input--search search__box__input" type="search" placeholder="Search to add a movie" v-model="search" v-on:keyup="searchApi" v-on:focus="searchApi" />
        </div>

        <div class="search__results" v-bind:class="{ 'has-results': results.length > 0 && search.length > 0 }">
            <ul>
                <li class="search__result" v-for="(movie, index) in results" v-bind:key="movie.id" v-bind:style="{ 'background-image': 'url(https://image.tmdb.org/t/p/w92/'+ movie.poster_path +')' }">
                    <h5>{{movie.title}} <small>({{ new Date(movie.release_date).getFullYear() }})</small></h5>
                    <button class="search__result__add" v-on:click="addMovie(index)">Add</button>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import firebase from 'firebase'
import DscrdWebhooks from 'webhook-discord'

export default {
    name: 'Search',

    data: function () {
        return {
            search: "",
            results: [],
            totalPages: null,
            totalResults: null,
            currentUser: null,
            dwh: null,
        }
    },

    methods: {
        clearResults: function () {
            this.results      = [],
            this.totalPages   = null,
            this.totalResults = null;
        },

        searchApi: function (e) {
            if (e.target.value.length === 0) {
                this.clearResults();
            } else {
                fetch(`https://api.themoviedb.org/3/search/movie?api_key=fba97c7e6c8f93d931fe92ce8c7ac282&language=en-US&query=${this.search}&page=1&include_adult=false`)
                .then( (response) => {
                    return response.json();
                })
                .then((data) => {
                    this.results      = data.results.slice(0, 10),
                    this.totalPages   = data.totalPages,
                    this.totalResults = data.totalResults;
                })
            }
        },

        addMovie: function (index) {
            var movie = this.results[index],
                add   = !!confirm('Are you sure you want to add ' + movie.title + ' to the backlog?'),
                db    = firebase.firestore();

            if (add) {
                const settings = {timestampsInSnapshots: true};
                db.settings(settings);

                var movies = db.collection('Movies');

                movies.where("id", "==", movie.id).limit(1).get().then(snapshot => {
                    if (snapshot.empty) {
                        movie.added_by = this.currentUser.email;
                        movies.add(movie)

                        console.log(this.dwh);

                        // Send message to Discord
                        this.dwh.custom("WILLARD THE ROBOT COP", "" + movie.title + " was just added by " + this.currentUser.displayName, "NEW BACKLOG MOVIE", "#f0407b");
                    } else {
                        alert(movie.title + ' already exists on the backlog.')
                    }
                });

                this.clearResults();
                this.search = '';
            }
        }
    },
    created: function () {
        var vm = this;
        var db    = firebase.firestore();
        const settings = {timestampsInSnapshots: true};
        db.settings(settings);

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
