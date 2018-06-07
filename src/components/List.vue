<template>
    <section class="subsection" id="backlog">
    <h2>To watch <small>{{ movies.length }} movies -- 3 points to make a pick</small></h2>

    <ul class="backlog">
        <li class="backlog__movie" v-for="movie in movies" v-bind:key=movie.id v-bind:style="{ 'background-image': 'url(' + movie.background_url + ')' }">
            <div class="backlog__movie__meta">
                <h3><a v-bind:href="movie.url" rel="external">{{ movie.title }}</a></h3>
                <p>Added by XXXX</p>
            </div>
            <button class="backlog__movie__control" v-on:click="makePick(movie.id)">Pick</button>
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

                    // db.collection('Users').where("uid", "==", movieDoc.added_by).get().then(function(querySnapshot) {
                    //     querySnapshot.forEach(function(user) {
                    //         var userData = user.data();
                    //         movieDoc.added_by_name = userData.displayName;
                    //     });
                    // });

                    movieDoc.url = "https://www.themoviedb.org/movie/" + movieDoc.id;

                    // Probably a better way to do this
                    if (movieDoc.backdrop_path === null) {
                        movieDoc.background_url = 'https://image.tmdb.org/t/p/w300/' + movieDoc.poster_path;
                    } else {

                        movieDoc.background_url = 'https://image.tmdb.org/t/p/w300/' + movieDoc.backdrop_path;
                    }

                    results.push(movieDoc);
                });
            });

            this.movies = results;
        },
        addFromList: function () {
            var searchField = document.getElementById('js-search-field');
            searchField.focus();
        },
        makePick: function (movieId) {
            const data = {
                movieId: movieId
            }

            const makePick = firebase.functions().httpsCallable('makePick');
            makePick(data).then(result => {
                console.log('result', XPathResult)
            })
        }
    },
    created: function () {
        this.fetchMovies();
    }
}
</script>
