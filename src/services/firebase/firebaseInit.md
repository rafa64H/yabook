Here goes the file named firebaseInit showing:

import { initializeApp } from "firebase/app";
const firebaseConfig = {
Some stuff
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
