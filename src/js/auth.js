var Firebase = require('firebase');

module.exports = {
  auth: null,
  init: function () {
    var config = {
      apiKey: "",
      authDomain: "",
      databaseURL: "",
      storageBucket: "",
    };
    Firebase.initializeApp(config);
    
    this.auth = Firebase.auth();
    this.auth
      .onAuthStateChanged(function(user) {
        console.log(user)
      })
    return this;
  }, 

  register(data){
    this.auth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(resultHandler)
      .catch(errorHandler);
  },

  login: function (type, data) {
    var auth = Firebase.auth();
    var request = null;
    switch(type){
      case 'email': {
        request = auth.signInWithEmailAndPassword(data.email, data.password)
        break;
      }

      case 'facebook': {
        var provider = new Firebase.auth.FacebookAuthProvider();
        provider.addScope('public_profile');
        request = auth.signInWithPopup(provider)
        break;
      }

      case 'twitter': {
        var provider = new Firebase.auth.TwitterAuthProvider();
        request = auth.signInWithPopup(provider)
        break;
      }

      case 'google': {
        var provider = new Firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login'); //Optional
        request = auth.signInWithPopup(provider)
        break;
      }

      case 'github': {
        var provider = new Firebase.auth.GithubAuthProvider();
        provider.addScope('repo'); //Optional
        request = auth.signInWithPopup(provider)
        break;
      }

      case 'anonymous': {
        request = auth.signInAnonymously();
        break;
      }
    }
    request
      .then(this.resultHandler)
      .catch(this.errorHandler);
  },

  resultHandler: function (user) {
    console.log(user)
  },

  errorHandler: function (err) {
    console.log(error);
  }
}