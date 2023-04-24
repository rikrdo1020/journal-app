import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider );
        //const credentials = GoogleAuthProvider.credentialFromResult( result );
        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }
    } catch (error) {
        
        const errorMessage = error.message;
        return {
            ok: false,
            errorMessage
        }
    }
}

export const registerUserWithEmailPassword = async({email, password, displayName}) => {

    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;
        await updateProfile( FirebaseAuth.currentUser , { displayName });

        return {
            ok: true,
            uid,
            photoURL,
            email,
            displayName
        }
        
    } catch (error) {
        return{
            ok: false,
            errorMessage: error.code === 'auth/email-already-in-use' && 'El usuario ya existe'
        }
    }
}

export const loginWithEmailPassword = async({ email, password }) => {
    //signInWithEmailAndPassword()
    try {
        
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, displayName, photoURL } = resp.user;
        return{
            ok: true,
            uid,
            displayName,
            photoURL,
            email
        }

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            errorMessage: 'Usuario o contraseña incorrecta.'
        }
    }
}

export const logoutFirebase = async() =>{
    return await FirebaseAuth.signOut();
}