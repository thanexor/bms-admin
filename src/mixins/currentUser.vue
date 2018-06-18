<script>
import Vue from 'vue'
import firebase from 'firebase'

Vue.mixin({
    created: function () {
        var authUser = firebase.auth().currentUser;

        if (authUser) {
            var db   = firebase.firestore(),
                uid = String(authUser.providerData[0].uid);

            const settings = {timestampsInSnapshots: true};
            db.settings(settings);

            var userRef = db.collection('Users').doc(uid);

            userRef.get().then((user) => {
                console.log('auth', authUser.providerData);
                if (!user.exists) {
                    userRef.set(authUser.providerData[0].email).then(() => {
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
