import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Login from './Login.vue'

import Upcoming from './components/Upcoming.vue'
import List from './components/List.vue'
import Rules from './components/Rules.vue'
import Scores from './components/Scores.vue'
import Watched from './components/Watched.vue'

import * as firebase from 'firebase';

firebase.initializeApp({
  apiKey:            "AIzaSyDvM2q1mKESdbL3Bjea5Boph8OsOHBXDx0",
  authDomain:        "bms-admin-1337.firebaseapp.com",
  databaseURL:       "https://bms-admin-1337.firebaseio.com",
  projectId:         "bms-admin-1337",
  storageBucket:     "bms-admin-1337.appspot.com",
  messagingSenderId: "42411448045"
});

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
  { name: 'upcoming', path: '/upcoming', component: Upcoming },
  { name: 'list', path: '/list', component: List },
  { name: 'scores', path: '/scores', component: Scores },
  { name: 'watched', path: '/watched', component: Watched },
  { name: 'rules', path: '/rules', component: Rules },
]

const router = new VueRouter({
  routes
})


firebase.auth().onAuthStateChanged(function(authUser) {
  var component = Login;

  if (authUser) {
    var db   = firebase.firestore(),
        uid = String(authUser.providerData[0].uid);

    const settings = {timestampsInSnapshots: true};
    db.settings(settings);

    var userRef = db.collection('Users').doc(uid);

    userRef.get().then((user) => {
      if (!user.exists) {
        userRef.set(authUser.providerData[0])
        .then(() => {
          userRef.update({admin: false})
          .then(() => {
            userRef.get().then((user) => { window.currentUser = user.data() });
          })

        })
      } else {
        window.currentUser = user.data();
      }
    });

    component = App;
  }

  new Vue({
    router,
    render: createEle => createEle (component)
  }).$mount('#app')
});
