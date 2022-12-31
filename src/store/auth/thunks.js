import { signInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice"

export const startGoogleSignIn = () => {
    console.log('test')
    return async( dispatch ) => {

        console.log('googlesignin');

        dispatch( checkingCredentials() );

        const result = await signInWithGoogle();

        if( !result.ok ) return dispatch( logout(result.errorMessage) );

        dispatch( login( result ) );

        localStorage.setItem( 'auth', JSON.stringify(result) );

    }
}