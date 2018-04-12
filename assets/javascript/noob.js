// Initialize Firebase
var config = {
    apiKey: "AIzaSyDXQDppaCOYjObESzBkDMa5HWgrc_ImwKM",
    authDomain: "noobdev-7d103.firebaseapp.com",
    databaseURL: "https://noobdev-7d103.firebaseio.com",
    projectId: "noobdev-7d103",
    storageBucket: "noobdev-7d103.appspot.com",
    messagingSenderId: "207322281576"
  };
  firebase.initializeApp(config);

// Create the variable to reference the database
var database = firebase.database();

// At the initial load and on subsequent data value changes, get a snapshot of the current data. (I.E FIREBASE HERE)

// This callback keeps the page updated when a value changes in firebase.
database.ref().on("value", function (snapshot) {

// We are now inside our .on function...

console.log(snapshot.val());

});
