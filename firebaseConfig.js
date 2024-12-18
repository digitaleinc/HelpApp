import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: 'AIzaSyA4ubWFc73-AdNGPJ-MBQteG_rtSjFXpTI',
    authDomain: 'https://help-people-9c04e.firebaseapp.com',
    databaseURL: 'https://help-people-9c04e-default-rtdb.europe-west1.firebasedatabase.app/',
    projectId: 'help-people-9c04e',
    storageBucket: 'help-people-9c04e.appspot.com',
    messagingSenderId: '920294911174',
    appId: '1:920294911174:android:d9fcfc94c03f6305bc7bc7',
    // measurementId: 'G-measurement-id',
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

export const database = getDatabase(app);
