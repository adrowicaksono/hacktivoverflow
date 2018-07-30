// Initialize Firebase
var config = {
    apiKey: "AIzaSyBDKzBbI9kNNVwOzESLn5keD-TQthDnnsE",
    authDomain: "hacktivoverflow-4332b.firebaseapp.com",
    databaseURL: "https://hacktivoverflow-4332b.firebaseio.com",
    projectId: "hacktivoverflow-4332b",
    storageBucket: "hacktivoverflow-4332b.appspot.com",
    messagingSenderId: "289611189169"
  };
  firebase.initializeApp(config);
var db = firebase.database()

export default db