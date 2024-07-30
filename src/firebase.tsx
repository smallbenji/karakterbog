// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	//@ts-ignore
	apiKey: import.meta.env.VITE_APIKEY,
	//@ts-ignore
	authDomain: import.meta.env.VITE_AUTHDOMAIN,
	//@ts-ignore
	projectId: import.meta.env.VITE_PROJECTID,
	//@ts-ignore
	storageBucket: import.meta.env.VITE_STORAGEBUCKET,
	//@ts-ignore
	messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
	//@ts-ignore
	appId: import.meta.env.VITE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
