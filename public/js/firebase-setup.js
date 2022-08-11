var config = {
  apiKey: "AIzaSyAF9DOghSXDQqCptcRxrbb1BifRAm77aqo",
  authDomain: "flood-app-bb6ee.firebaseapp.com",
  databaseURL: "https://flood-app-bb6ee.firebaseio.com",
  projectId: "flood-app-bb6ee",
  storageBucket: "flood-app-bb6ee.appspot.com",
  messagingSenderId: "543807546921"
};

var user;
var Data;

(function() {
  var $login = $('#login');
  var $signOut = $('#sign-out');
  var $account = $('#account');

  function toggleMenu(displayName) {
    if (displayName) {
      $login.closest('.nav-item').hide();
      $account.text(displayName);
      $account.closest('.nav-item').show();
    }
    else {
      $login.closest('.nav-item').show();
      $account.text('Account');
      $account.closest('.nav-item').hide();
    }
  }

  firebase.initializeApp(config);

  $login.on('click touchstart', function() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  });

  $signOut.click(function() {
    firebase.auth().signOut();
  });

  firebase.auth().onAuthStateChanged(function(u) {
    if (u) {
      user = u;
      toggleMenu(user.displayName);
      identifyPersonType();
    }
    else {
      user = undefined
      toggleMenu();
    }
    $('#instructions').modal('show')
  });

  function identifyPersonType() {
    var ref = firebase.database().ref('users/');
    ref.orderByChild("username").equalTo(user.displayName).once('child_added', function(data) {
      if (data.val().first === true) {
        $('#instructions').modal('show')
      } else if (data.val().account === 2) {
        document.getElementById('Shelter').style.display = 'block';
      // } else if (data.val().account === 3) {
      //   document.getElementById('Sensor').style.display = 'block';
      }
    });
  }
})();
