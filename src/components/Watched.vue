<template>
    <section class="subsection" id="watched">
        <h2>Watched <small>(in progress)</small></h2>
        <div class="movies movies--flow">

            <!-- ACTUAL PICKS -->
            <div class="movie" v-for="pick in watchedPicks" v-bind:style="{ 'background-image': 'url(' + pick.movie.backdrop_url + ')' }" v-bind:key="pick.id" v-bind:data-id="pick.id">
                <div class="movie__meta" v-bind:style="{ 'background-image': 'url(' + pick.movie.poster_url + ')' }">
                    <div class="movie__head">
                        <h4><a v-bind:href="pick.movie.url" rel="external">{{ pick.movie.title }}</a> <small>({{ new Date(pick.movie.release_date).getFullYear() }})</small></h4>
                        <!-- <h3>Picked by {{ pick.picker.displayName }}</h3> -->
                    </div>
                    <p><a v-bind:href="pick.trailer_url">Trailer</a></p>
                    <p><strong>Budget</strong>: N/A (lol)</p>
                    <p><strong>Point cost</strong>: {{ pick.total_points }}</p>
                </div>

                <!-- <div class="movie__ratings">
                    <div class="movie__ratings__listing">
                        <h5>😁</h5>
                        <ul>
                            <li>Thane</li>
                            <li>Jackson</li>
                            <li>Travis</li>
                        </ul>
                    </div>

                    <div class="movie__ratings__listing">
                        <h5>🖕</h5>
                        <ul>
                            <li>Chris</li>
                            <li>Larry</li>
                        </ul>
                    </div>

                    <div class="movie__ratings__listing">
                        <h5>😐</h5>
                        <ul>
                            <li>Nobody!</li>
                        </ul>
                    </div>

                </div> -->

            </div>
        </div>

    </section>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Watched',
  data : function () {
    return {
        watchedPicks: [],
    }
  },

  created() {
    const db = firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    db.settings(settings);


    db.collection('Picks').where("state", "==", "completed").get().then(picks => {
        picks.forEach(pick => {
            var displayPick    = pick.data();

            displayPick.id = pick.id;

            displayPick.movie.get().then(movie => {
                displayPick.movie = movie.data();
                displayPick.movie.url = "https://www.themoviedb.org/movie/" + displayPick.movie.id;
                displayPick.movie.poster_url = 'https://image.tmdb.org/t/p/w92/' + displayPick.movie.poster_path;
                displayPick.movie.backdrop_url = displayPick.movie.backdrop_path !==null ? 'https://image.tmdb.org/t/p/w780/' + displayPick.movie.backdrop_path : '';
            })

            displayPick.picker.get().then(picker => {
                displayPick.picker = picker.data();
            })

            this.watchedPicks.push(displayPick);
        })
    });


  }
}
</script>
