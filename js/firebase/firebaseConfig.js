import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAfEU1tg8luekB86eddJrf2NxR8bw4nkZ4",
  authDomain: "camp-project2-e7895.firebaseapp.com",
  projectId: "camp-project2-e7895",
  storageBucket: "camp-project2-e7895.appspot.com",
  messagingSenderId: "967180271224",
  appId: "1:967180271224:web:8952e5c99d9ec909ccb78d",
  measurementId: "G-QT8TP4TESC",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
