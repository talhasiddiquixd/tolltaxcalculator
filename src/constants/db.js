import {initializeApp} from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyDIjMgAi3I8ka8E_LHwftb757kz1Z5rOF4',
  authDomain: 'tolltax-5a097.firebaseapp.com',
  projectId: 'tolltax-5a097',
  storageBucket: 'tolltax-5a097.appspot.com',
  appId: '1:79990691754:ios:21d3802983168f84b8bdd3',
};

// Initialize Firebase app
export const app = initializeApp(firebaseConfig);

// Firestore instance
export const db = firestore();
