<template>
    <section class="subsection" id="rules">
        <h2>Rules</h2>
        <h3>POINTS</h3>
        <ul>
            <li>Show up at official Movie Night = 1 point</li>
            <li>First time showing up = {{defaultPointCost}} points</li>
        </ul>

        <h3>PICKS</h3>
        <ul>
           <li>Spend {{defaultPointCost}} points to secure a pick</li>
            <li>Picks can be outbid by adding an additional point (if you hate the movie or whatever)</li>
            <li>Pick spots are made on a first-come-first-serve basis</li>
            <li>Movies longer than 2 hours of total runtime are an additional point</li>
        </ul>

        <h2>Admin</h2>
        <div class="admin-close">
            <h3>Close night: Fuck John Cusack</h3>
            <div class="admin-close__meta">
                <p>April 20th, 2019</p>
            </div>

            <h3>Attendees &amp; ratings:</h3>
            <ul class="ratings-controls">
                <li class="ratings-control">
                    <h4><input class="toggle-attendee" type="checkbox" checked /> Thane</h4>
                    <div class="ratings-control__group">
                        <div class="ratings-control__group__slot">
                            <h5>Dude, Where's My Car?</h5>
                            <button class="btn-emoji-toggle">😍</button>
                            <button class="btn-emoji-toggle">😐</button>
                            <button class="btn-emoji-toggle">😡</button>
                            <button class="btn-emoji-toggle is-checked">&nbsp;</button>
                        </div>
                        <div class="ratings-control__group__slot">
                            <h5>Twisted Pair</h5>
                            <button class="btn-emoji-toggle">😍</button>
                            <button class="btn-emoji-toggle">😐</button>
                            <button class="btn-emoji-toggle">😡</button>
                            <button class="btn-emoji-toggle is-checked">&nbsp;</button>
                        </div>
                    </div>
                </li>
                <li class="ratings-control">
                    <h4><input class="toggle-attendee" type="checkbox" checked /> Wizzy</h4>
                    <div class="ratings-control__group">
                        <div class="ratings-control__group__slot">
                            <h5>Dude, Where's My Car?</h5>
                            <button class="btn-emoji-toggle is-checked">😍</button>
                            <button class="btn-emoji-toggle">😐</button>
                            <button class="btn-emoji-toggle">😡</button>
                            <button class="btn-emoji-toggle">&nbsp;</button>
                        </div>
                        <div class="ratings-control__group__slot">
                            <h5>Twisted Pair</h5>
                            <button class="btn-emoji-toggle is-checked">😍</button>
                            <button class="btn-emoji-toggle">😐</button>
                            <button class="btn-emoji-toggle">😡</button>
                            <button class="btn-emoji-toggle">&nbsp;</button>
                        </div>
                    </div>
                </li>
                <li class="ratings-control">
                    <h4><input class="toggle-attendee" type="checkbox" /> Angi</h4>
                    <div class="ratings-control__group is-disabled">
                        <div class="ratings-control__group__slot">
                            <h5>Dude, Where's My Car?</h5>
                            <button class="btn-emoji-toggle is-checked">😍</button>
                            <button class="btn-emoji-toggle">😐</button>
                            <button class="btn-emoji-toggle">😡</button>
                            <button class="btn-emoji-toggle">&nbsp;</button>
                        </div>
                        <div class="ratings-control__group__slot">
                            <h5>Twisted Pair</h5>
                            <button class="btn-emoji-toggle is-checked">😍</button>
                            <button class="btn-emoji-toggle">😐</button>
                            <button class="btn-emoji-toggle">😡</button>
                            <button class="btn-emoji-toggle">&nbsp;</button>
                        </div>
                    </div>
                </li>
            </ul>
            <button class="btn btn--mini" v-on:click="completeNight()">Complete night &amp; create next week</button>
        </div>
    </section>
</template>

<script>
import firebase from 'firebase'


export default {
  name: 'Rules',

  data: function () {
    return {
      defaultPointCost: window.Global.defaultPointCost,
    }
  },

  methods: {
    completeNight: function () {
      var db   = firebase.firestore();

      db.collection('Nights').where("state", "==", "pending").get().then(nights => {
        nights.forEach(night => {

          night.ref.update({
            state: 'completed'
          }).then(function (){
            window.location.reload(true);
          });
          
        });
      });
    }
  }
}
</script>
