<script>
import Vue from 'vue'
import firebase from 'firebase'

Vue.mixin({
    created: function () {
        var authUser = firebase.auth().currentUser;

        if (authUser) {
            var db   = firebase.firestore(),
                email = String(authUser.providerData[0].email);

            const settings = {timestampsInSnapshots: true};
            db.settings(settings);

            var userRef = db.collection('Users').doc(email);

            userRef.get().then((user) => {
                if (!user.exists) {
                    userRef.set(authUser.providerData[0]).then(() => {
                        console.log('User Data', userRef)
                        userRef.update({admin: false}).then(() => {
                            userRef.get().then((user) => {
                                this.$data.currentUser = user.data()
                            });
                        })
                    })
                } else {
                    this.$data.currentUser = user.data();
                }
            });
        }
    }
})
</script>
