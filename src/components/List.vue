<template>
    <section class="subsection" id="backlog">
    <h2>To watch</h2>

    <ul class="backlog">
        <li class="backlog__movie" v-for="movie in movies" v-bind:style="{ 'background-image': 'url(' + movie.backdrop_url + ')' }" v-bind:data-id="movie.id">
            <button class="backlog__movie__control">{{ movie.title }}</button>
        </li>

        <li class="backlog__movie backlog__movie--add">
            <button class="btn btn--full" v-on:click="addFromList">+ Add a movie</button>
        </li>
    </ul>
    </section>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'List',

    data: function () {
        return {
            movies: []
        }
    },

    methods: {
        fetchMovies: function () {
            var db   = firebase.firestore(),
                results = [];

            db.collection("Movies").get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    var movieDoc = doc.data();

                    // Probably a better way to do this
                    movieDoc.backdrop_url = 'https://image.tmdb.org/t/p/w300/' + movieDoc.backdrop_path;

                    results.push(movieDoc);
                    console.log(movieDoc);
                });
            });

            this.movies = results;
        },
        addFromList: function () {
            var searchField = document.getElementById('js-search-field');
            searchField.focus();
        }
    },
    created: function () {
        this.fetchMovies();
    }
}
</script>
