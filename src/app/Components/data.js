import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, push, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCdVcqNGZGqrITWG5mIZrf3DEy16h39G1w",
  authDomain: "nextjs-f4e1b.firebaseapp.com",
  projectId: "nextjs-f4e1b",
  storageBucket: "nextjs-f4e1b.appspot.com",
  messagingSenderId: "443323480846",
  appId: "1:443323480846:web:75b6547baae3c4e2af755f",
  measurementId: "G-N8V7DSL73R",
};

let app;
if (typeof window !== "undefined") {
  app = initializeApp(firebaseConfig);
  getAnalytics(app); // Initialize Firebase Analytics
} else {
  app = initializeApp(firebaseConfig);
}

// Initialize Firestore
const db = getDatabase(app);

const addCheckInToFirebase = async (title, owner, imgUrl) => {
  try {
    const databaseRef = ref(db, "checkins");
    const newCheckInRef = push(databaseRef);

    // Push data to the Realtime Database
    await set(newCheckInRef, {
      title,
      owner,
      imgUrl,
      timestamp: new Date().toString(),
    });

    console.log("Check-in added successfully!");
  } catch (error) {
    console.error("Error adding check-in: ", error);
  }
};

export { db, addCheckInToFirebase };
