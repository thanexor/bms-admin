<template>
    <section class="subsection" id="upcoming">
        <h2>Next up</h2>
        <div class="night">
            <div class="night__meta">
            <h3>THE BREEN-ENING</h3>
            <p>Wednesday, Junelygust 39th, 3005 @ Jackson's House</p>
            </div>

            <div class="movies">

            <div class="movie" style="background-image: url(https://i.ytimg.com/vi/_PtX6JHcjz4/maxresdefault.jpg)">
                <div class="movie__meta">
                <a href="https://www.imdb.com/title/tt1561457/">
                    <h4 class="movie__title">Double Down (2005)</h4>
                </a>
                <p>Picked by Thane</p>
                </div>

                <div class="movie__ratings">
                <div class="movie__ratings__listing">
                    <h5>Loved:</h5>
                    <ul>
                    <li>Thane</li>
                    <li>Jackson</li>
                    <li>Travis</li>
                    </ul>
                </div>

                <div class="movie__ratings__listing">
                    <h5>Hated:</h5>
                    <ul>
                    <li>Chris</li>
                    <li>Larry</li>
                    </ul>
                </div>

                <div class="movie__ratings__listing">
                    <h5>Meh:</h5>
                    <ul>
                    <li>Nobody!</li>
                    </ul>
                </div>
                </div>
            </div>

            <div class="movie" style="background-image: url(https://static.wixstatic.com/media/500458_52fe864b389b4b67b4abe6fdb7aa472a~mv2.jpg/v1/fill/w_630,h_420,al_c,q_80,usm_0.66_1.00_0.01/500458_52fe864b389b4b67b4abe6fdb7aa472a~mv2.webp)">

                <div class="movie__meta">
                <a href="https://www.imdb.com/title/tt1561457/">
                    <h4 class="movie__title">Fateful Findings (2013)</h4>
                </a>
                <p>Picked by Thane</p>
                </div>

                <div class="movie__ratings">
                <div class="movie__ratings__listing">
                    <h5>Loved:</h5>
                    <ul>
                    <li>Thane</li>
                    <li>Jackson</li>
                    <li>Travis</li>
                    </ul>
                </div>

                <div class="movie__ratings__listing">
                    <h5>Hated:</h5>
                    <ul>
                    <li>Chris</li>
                    <li>Larry</li>
                    </ul>
                </div>

                <div class="movie__ratings__listing">
                    <h5>Meh:</h5>
                    <ul>
                    <li>Nobody!</li>
                    </ul>
                </div>
                </div>
            </div>

            </div>

        </div>
    </section>
</template>

<script>
export default {
  name: 'Upcoming',
  data: {
    upcomingMovies: []
  },
  methods: {
    fetchMovieData: function (movieId) {
        fetch(`https://api.themoviedb.org/3/movie/{movieId}?api_key=fba97c7e6c8f93d931fe92ce8c7ac282&language=en-US`)
        .then( (response) => {
            return response.json();
        })
        .then((data) => {
            console.log('found', data);
            // this.upcomingMovies.push      = data.results.slice(0, 10),
            // this.totalPages   = data.totalPages,
            // this.totalResults = data.totalResults;
        })
    }
  },
  created: function () {
    
    // this.fetchMovieData(31130); // pass thru
    // this.fetchMovieData(373841); // pass thru
    // this.fetchMovieData(5753); // deadly prey
    // this.fetchMovieData(50505); // low blow
  }
}
</script>
