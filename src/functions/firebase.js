import firebase from 'firebase/app';
import 'firebase/database';

const config = {
   apiKey: "AIzaSyADmPSWwpph0QACJh8Y30XJc40f-NJU2ag",
    authDomain: "art-gallery-18a52.firebaseapp.com",
    databaseURL: "https://art-gallery-18a52.firebaseio.com",
    projectId: "art-gallery-18a52",
    storageBucket: "art-gallery-18a52.appspot.com",
    messagingSenderId: "746661822250"
  };

 firebase.initializeApp(config);

 const firebaseDB = firebase.database();

 export {firebaseDB};

 

 