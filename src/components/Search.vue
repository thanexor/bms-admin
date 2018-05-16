<template>
    <section role="search" class="search">

        <div class="search__box">
            <input class="input input--search search__box__input" type="search" placeholder="Search to add a movie" v-model="search" v-on:keyup="searchApi" v-on:focus="searchApi" />
        </div>

        <div class="search__results" v-bind:class="{ 'has-results': results.length > 0 && search.length > 0 }">
            <ul>
                <li class="search__result" v-for="movie in results" v-bind:key="movie.id">
                    <h5>{{movie.title}} <small>({{ new Date(movie.release_date).getFullYear() }})</small></h5>
                    <button class="search__result__add" v-on:click="addMovie" v-bind:data-movietitle="movie.title">Add</button>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
export default {
    name: 'Search',

    data: function () {
        return {
            search: "",
            results: [],
            totalPages: null,
            totalResults: null
        }
    },

    methods: {
        clearResults: function () {
            this.results      = [],
            this.totalPages   = null,
            this.totalResults = null;
        },

        searchApi: function (e) {
            console.log('length', e.target.value.length);

            if (e.target.value.length === 0) {
                this.clearSearch();
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

        addMovie: function (e, wut) {
            var title = '' + e.target.getAttribute('data-movietitle');
            var picked = !!confirm('Are you sure you want to add ' + title + ' to the backlog?');

            if (picked) {
                // add to backlog
                this.clearResults();
                this.search = '';
            }
        },

        convertToYear: function (date) {

        }
    }
}
</script>
