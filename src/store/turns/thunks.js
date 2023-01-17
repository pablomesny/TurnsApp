import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase";
import { loadTurns } from "../../helpers";
import { onAddNewTurn, onDeleteTurn, onUpdateTurn, setTurns } from "./turnsSlice";

export const startNewTurn = ( turn ) => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        const newDoc = doc( collection( FirebaseDB, `${ uid }/turnsapp/turns`));
        await setDoc( newDoc, turn );

        turn.id = newDoc.id;

        dispatch(onAddNewTurn(turn));
    }
}

export const startLoadingTurns = () => {
    return async(dispatch, getState) => {

        const { uid } = getState().auth;
        if( !uid ) throw new Error('El UID del usuario no existe');

        const turns = await loadTurns(uid);

        dispatch(setTurns(turns));
    }
}

export const startUpdateTurn = ( turn ) => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        const turnToFirestore = { ...turn };
        delete turnToFirestore.id;

        const docRef = doc( FirebaseDB, `${ uid }/turnsapp/turns/${ turn.id }`);
        await setDoc( docRef, turnToFirestore, { merge: true });

        dispatch( onUpdateTurn(turn) );

    }
}

export const startDeleteTurn = ( turn ) => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        const docRef = doc( FirebaseDB, `${ uid }/turnsapp/turns/${ turn.id }`);
        await deleteDoc(docRef);

        dispatch( onDeleteTurn( turn ) );

    }
}