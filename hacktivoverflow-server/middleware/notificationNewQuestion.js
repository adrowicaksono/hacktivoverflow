const admin = require('firebase-admin');

const serviceAccount = require('../firebase/keyFirebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://hacktivoverflow-4332b.firebaseio.com'
});

const db = admin.database()

const ref = db.ref("Questions");
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});

