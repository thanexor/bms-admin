document.addEventListener('DOMContentLoaded', function() {
    // Move to routes file after we get importing
    Vue.use(VueRouter)

    const Login = Vue.extend({
        template: '<div>LOGIN</div>',
        mounted() {
            console.log('Login Component: Mounted')
            var provider = new firebase.auth.GoogleAuthProvider()
            window.firebase.auth().signInWithPopup(provider).then(function(result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;

                console.log('tok', token, 'user', user);
                // ...
              }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
              });

              firebase.auth().onAuthStateChanged(user => {
                if (user) {
                  console.log('User Authenticated', user);
                  console.log('Changing to dashboard Route');
                  router.push('dashboard');
                } else {
                  console.log('User Not Authendticated')
                }
              });
        },
        updated() {
            console.log('Login Component: Updated')
        }
    })

    const Dashboard = Vue.extend({
        template: '<div>DASH</div>',
        mounted() {
            console.log('Dashboard Component: Mounted')
        },
        updated() {
            console.log('Dashboard Component: Updated')
        }
    })

    const routes = [
        { name: 'login', path: '/login', component: Login },
        { name: 'dashboard', path: '/dashboard', component: Dashboard }
    ]

    const router = new VueRouter({
        routes
    })

    const app = new Vue({
        router,
    }).$mount('#app');

});
