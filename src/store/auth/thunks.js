import { logoutFirebase, signInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice"

export const startGoogleSignIn = () => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const result = await signInWithGoogle();

        if( !result.ok ) return dispatch( logout(result.errorMessage) );

        dispatch( login( result ) );

        localStorage.setItem( 'auth', JSON.stringify(result) );

    }
}

export const startLogout = () => {
    return async( dispatch ) => {

        await logoutFirebase();
        dispatch( logout() );

    }
}