<template>
    <section class="subsection" id="scoreboard">
        <h2>Scoreboard</h2>
        <table class="scoreboard">
            <tr>
                <th>Participant</th>
                <th class="scoreboard__score scoreboard__score--head">Points</th>
            </tr>

            <tr v-for="user in users" v-bind:key=user.uid>
                <td>
                    <h4>{{user.displayName}}</h4>
                    <p>Has made X picks</p>
                    <p>Last picked Movie XYZ on Apr 20, 2018</p>
                </td>
                <td class="scoreboard__score">{{user.total_points}}</td>
            </tr>
            <!-- <tr>
                <td>
                    <h4>Jackson</h4>
                    <p>Has made 5 picks</p>
                    <p>Last picked Road House on Apr 20, 2018</p>
                </td>
                <td class="scoreboard__score">3</td>
            </tr>
            <tr>
                <td>
                    <h4>Mr Poop</h4>
                    <p>Has made 5 picks</p>
                    <p>Last picked Road House on Apr 20, 2018</p>
                </td>
                <td class="scoreboard__score">3</td>
            </tr>
            <tr>
                <td>
                    <h4>Chris</h4>
                    <p>Has made 5 picks</p>
                    <p>Last picked Road House on Apr 20, 2018</p>
                </td>
                <td class="scoreboard__score">3</td>
            </tr>
            <tr>
                <td>
                    <h4>Larry</h4>
                    <p>Has made 5 picks</p>
                    <p>Last picked Road House on Apr 20, 2018</p>
                </td>
                <td class="scoreboard__score">6</td>
            </tr>
            <tr>
                <td>
                    <h4>Jordan</h4>
                    <p>Has made 5 picks</p>
                    <p>Last picked Road House on Apr 20, 2018</p>
                </td>
                <td class="scoreboard__score">2</td>
            </tr>
            <tr>
                <td>
                    <h4>Vanessa</h4>
                    <p>Has made 5 picks</p>
                    <p>Last picked Road House on Apr 20, 2018</p>
                </td>
                <td class="scoreboard__score">4</td>
            </tr>
            <tr>
                <td>
                    <h4>Megan</h4>
                    <p>Has made 5 picks</p>
                    <p>Last picked Road House on Apr 20, 2018</p>
                </td>
                <td class="scoreboard__score">8</td>
            </tr>
            <tr>
                <td>
                    <h4>Wizzy</h4>
                    <p>Has made 5 picks</p>
                    <p>Last picked Road House on Apr 20, 2018</p>
                </td>
                <td class="scoreboard__score">4</td>
            </tr>
            <tr>
                <td>
                    <h4>Katy</h4>
                    <p>Has made 5 picks</p>
                    <p>Last picked Road House on Apr 20, 2018</p>
                </td>
                <td class="scoreboard__score">2</td>
            </tr>
            <tr>
                <td>
                    <h4>Beth</h4>
                    <p>Has made 5 picks</p>
                    <p>Last picked Road House on Apr 20, 2018</p>
                </td>
                <td class="scoreboard__score">3</td>
            </tr> -->
        </table>
    </section>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'Scores',

    data() {
        return {
            users: []
        }
    },

    created() {
        const db = firebase.firestore();
        const settings = {timestampsInSnapshots: true};
        db.settings(settings);

        db.collection('Users').orderBy("total_points", "desc").get().then(users => {
            users.forEach(user => {
                this.users.push(user.data())
            })
        });
    }
}
</script>
