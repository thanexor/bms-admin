<template>
    <section class="subsection" id="upcoming">
        <h2>Next up</h2>
        <div class="night">
            <div class="night__meta">
                <h3>THE BREEN-ENING</h3>
                <p>Wednesday, Junelygust 39th, 3005 @ Jackson's House</p>
            </div>

            <div class="movies">
        
                <div class="movie" v-for="pick in picks" v-bind:style="{ 'background-image': 'url(' + pick.movie.poster_url + ')' }" v-bind:key="pick.id">
                    <div class="movie__meta">
                        <a href="https://www.imdb.com/title/tt1561457/">
                            <h4 class="movie__title">{{ pick.movie.title }} {{ new Date(pick.movie.release_date).getFullYear() }}</h4>
                        </a>
                        <p>Picked by {{ pick.picker.displayName }}</p>
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
import firebase from 'firebase'

export default {
  name: 'Upcoming',
  data: function () {
        return {
            picks: []
        }
    },

    components: {
    },

    methods: {
    },

    created() {
        const db = firebase.firestore();
        const settings = {timestampsInSnapshots: true};
        db.settings(settings);


        db.collection('Picks').where("state", "==", "pending").get().then(picks => {
            picks.forEach(pick => {
                var displayPick    = pick.data();

                displayPick.id = pick.id;

                displayPick.movie.get().then(movie => {
                    displayPick.movie = movie.data();
                    displayPick.movie.poster_url = 'https://image.tmdb.org/t/p/w780/' + displayPick.movie.poster_path;
                })

                displayPick.picker.get().then(picker => {
                    displayPick.picker = picker.data();
                })

                displayPick.user_points.forEach((userPoint, index) => {
                    userPoint.user.get().then(user => {
                        userPoint.user = user.data()
                    })
                })

                console.log('display pick: ', displayPick)
                this.picks.push(displayPick);
            })
        })
    }
}
</script>
