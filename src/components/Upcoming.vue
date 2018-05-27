<template>
    <section class="subsection" id="upcoming">
        <h2>Upcoming</h2>
        <div class="night">
            <div class="night__meta">
                <div class="night__meta__info">
                    <h3>{{night.title}}</h3>
                    <p>{{night.date}} @ {{night.location}}</p>
                </div>
                <div class="night__meta__actions">
                    <button class="night__action--join btn btn--mini" v-on:click="toggleAttendance">{{isAttendingText}}</button>
                </div>
            </div>

            <div class="movies">

                <div class="movie" v-for="pick in picks" v-bind:style="{ 'background-image': 'url(' + pick.movie.backdrop_url + ')' }" v-bind:key="pick.id">
                    <div class="movie__meta" v-bind:style="{ 'background-image': 'url(' + pick.movie.poster_url + ')' }">
                        <div class="movie__head">
                            <h4><a href="" v-bind:href="pick.movie.url" rel="external">{{ pick.movie.title }}</a> <small>({{ new Date(pick.movie.release_date).getFullYear() }})</small></h4>
                            <h3>Picked by {{ pick.picker.displayName }}</h3>
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

        </div>
    </section>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Upcoming',
  data: function () {
        return {
            picks: [],
            night: {
                title:    '',
                date:     '',
                location: '',
            },
            isAttending: false,
            isAttendingText: "Join",
        }
    },

    watch: {
        isAttending: function () {
            this.isAttendingText = this.isAttending ? 'Leave' : 'Join';
        }
    },

    components: {
    },

    methods: {
        toggleAttendance: function () {
            const toggle = firebase.functions().httpsCallable('toggleAttendance');
            toggle().then(result => {
                this.isAttending = result.data.isAttending;
            })
        }

    },

    created() {
        const db = firebase.firestore();
        const settings = {timestampsInSnapshots: true};
        db.settings(settings);


        db.collection('Picks').where("state", "==", "active").get().then(picks => {
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

                this.picks.push(displayPick);
            })
        })

        db.collection('Nights').where("state", "==", "pending").get().then(nights => {
            nights.forEach(night => {
                this.night = night.data();

                console.log('this.night', night);
                const attendance = firebase.functions().httpsCallable('getAttendance');
                attendance({nightId: night.id}).then(result => {
                    this.isAttending = result.data.isAttending;
                })

                var date = new Date(null);
                date.setTime(this.night.date.seconds*1000);

                this.night.date = date.toLocaleDateString('en-US', {
                    weekday: 'short',
                    day: '2-digit',
                    month: 'short',
                    hour:"2-digit",
                    minute: "2-digit"
                });
            });
        });


    }
}
</script>
