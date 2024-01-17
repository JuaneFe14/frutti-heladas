// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyAgZPJLrrmAvWmgXv7ZqzbzjucEHtsnp-A",
    authDomain: "frutti-heladas-e0b11.firebaseapp.com",
    projectId: "frutti-heladas-e0b11",
    storageBucket: "frutti-heladas-e0b11.appspot.com",
    messagingSenderId: "268325432838",
    appId: "1:268325432838:web:26d896cd98f2eb28c11d87"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();