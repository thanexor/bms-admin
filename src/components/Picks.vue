<template>
    <section class="subsection" id="picks">
        <h2>Picks</h2>

        <ul class="picks">
            <li class="pick__card" v-for="pick in picks" v-bind:key=pick.id>
                <img class="pick__card__poster" v-bind:src=pick.movie.poster_url>
                <div class="pick__card__info">
                    <header>{{pick.movie.title}}</header>
                    <p>Picked by {{pick.picker.displayName}}</p>

                </div>
            </li>
        </ul>
    </section>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'Picks',

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
                    displayPick.movie.poster_url = 'https://image.tmdb.org/t/p/w300/' + displayPick.movie.poster_path;
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
