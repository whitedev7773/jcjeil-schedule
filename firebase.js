// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
