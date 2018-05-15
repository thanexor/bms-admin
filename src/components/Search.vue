<template>
    <section class="subsection">
        <h4>Search</h4>
        <input type="text" v-model="search"/>
        <button v-on:click="searchApi">Submit</button>
        <h4>Results</h4>
        <ul>
            <li v-for="movie in results" v-bind:key="movie.id">
                {{movie.title}} -- {{movie.release_date}}
                <button v-on:click="addMovie">Add</button>
            </li>
        </ul>
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
        searchApi: function () {
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=fba97c7e6c8f93d931fe92ce8c7ac282&language=en-US&query=${this.search}&page=1&include_adult=false`)
            .then( (response) => {
                return response.json();
            })
            .then((data) => {
                this.results      = data.results,
                this.totalPages   = data.totalPages,
                this.totalResults = data.totalResults;
                console.log('this', this);
            })
        },

        addMovie: function () {
            console.log('Wow!')
        }
    }
}
</script>
