// // Move to routes file after we get importing
// Vue.use(VueRouter)


// const Login = Vue.extend({
//     template: '<div>LOGIN</div>',
//     mounted() {
//         console.log('Login Component: Mounted')
//         console.log('This', this)
//         var provider = new firebase.auth.GoogleAuthProvider()
//         console.log('?', provider)
//         window.firebase.auth().signInWithPopup(provider).then(function(result) {
//             // This gives you a Google Access Token. You can use it to access the Google API.
//             var token = result.credential.accessToken;
//             // The signed-in user info.
//             var user = result.user;

//             console.log('tok', token, 'user', user);
//             // ...
//           }).catch(function(error) {
//             // Handle Errors here.
//             var errorCode = error.code;
//             var errorMessage = error.message;
//             // The email of the user's account used.
//             var email = error.email;
//             // The firebase.auth.AuthCredential type that was used.
//             var credential = error.credential;
//             // ...
//           });
//     },
//     updated() {
//         console.log('Login Component: Updated')
//     }
// })

// const Dashboard = Vue.extend({
//     template: '<div>DASH</div>',
//     mounted() {
//         console.log('Dashboard Component: Mounted')
//     },
//     updated() {
//         console.log('Dashboard Component: Updated')
//     }
// })

// const routes = [
//     { path: '/login', component: Login },
//     { path: '/dashboard', component: Dashboard }
// ]

// const router = new VueRouter({
//     routes
// })

// const app = new Vue({
//     router,
// }).$mount('#app');


console.log('now');
