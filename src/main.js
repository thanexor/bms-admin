import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Login from './Login.vue'
import Hellow from './components/HelloWorld.vue'

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
  { name: 'login', path: '/login', component: Login },
  { name: 'home', path: '/home', component: App}
]

const router = new VueRouter({
  routes
})

firebase.auth().onAuthStateChanged(function(user) {
  var component = Login;

  if (user) {
    console.log('is logged in', user);
    component = App;
  }

  console.log('using component', component);

  new Vue({
    router,
    render: createEle => createEle (component)
  }).$mount('#app')
});
