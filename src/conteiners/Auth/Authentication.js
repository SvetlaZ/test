import * as firebase from 'firebase';

export default function Authentication() {
  if (!firebase.apps.length) {
    let firebaseConfig = {
      apiKey: "AIzaSyBqxC7p9MXNBgFXpSuSUicsMFwhYVZXx6o",
      authDomain: "gotovo-test-9f899.firebaseapp.com",
      databaseURL: "https://gotovo-test-9f899.firebaseio.com",
      projectId: "gotovo-test-9f899",
      storageBucket: "gotovo-test-9f899.appspot.com",
      messagingSenderId: "315153781152",
      appId: "1:315153781152:web:634ce87b79d732a01f94c5"
    };

    firebase.initializeApp(firebaseConfig);
    firebase.auth().languageCode = 'en';
  }
};
