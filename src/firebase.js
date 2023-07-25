import firebase, {initializeApp} from 'firebase/compat/app';
import 'firebase/compat/auth'; 



 const app = firebase.initializeApp({
    apiKey: "AIzaSyABKXn--FYxbTkzn9QDemqwU1vSOURD_Zs",
    authDomain: "react-auth-78fe0.firebaseapp.com",
    projectId: "react-auth-78fe0",
    storageBucket: "react-auth-78fe0.appspot.com",
    messagingSenderId: "656363481095",
    appId: "1:656363481095:web:7f8cf7d4046c7d6cf162a2"
})



const auth = app.auth()

export {app, auth}
