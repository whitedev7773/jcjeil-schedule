// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCCk8Q24U4P2RWZiQs-YLtLgaiDaq_JsjM",
    authDomain: "jcjeil-schedule.firebaseapp.com",
    databaseURL: "https://jcjeil-schedule-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "jcjeil-schedule",
    storageBucket: "jcjeil-schedule.appspot.com",
    messagingSenderId: "913564419683",
    appId: "1:913564419683:web:5b25d872a212092c90da56",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const dbRef = ref(getDatabase(app));

export function GetDatabase(url="/") {

    return get(child(dbRef, url));
        // .then((snapshot) => {
        //     if (snapshot.exists()) {
        //         console.log(snapshot.val());
        //         return snapshot.val();
        //     }
        //     else {
        //         console.log("No data available");
        //         return null;
        //     }
        // })
        // .catch((error) => {
        //     console.error(error);
        //     return null;
        // });
    
}
