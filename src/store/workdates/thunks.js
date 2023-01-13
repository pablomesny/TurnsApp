import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadTurns } from "../../helpers";
import { onAddNewDate, onDeleteWorkDate, onUpdateWorkDate, setTurns } from "./workDatesSlice";

export const startNewWorkDate = ( turn ) => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        const newDoc = doc( collection( FirebaseDB, `${ uid }/turnsapp/turns`));
        await setDoc( newDoc, turn );

        turn.id = newDoc.id;

        dispatch(onAddNewDate(turn));
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

        dispatch( onUpdateWorkDate(turn) );

    }
}

export const startDeleteTurn = ( turn ) => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        const docRef = doc( FirebaseDB, `${ uid }/turnsapp/turns/${ turn.id }`);
        await deleteDoc(docRef);

        dispatch( onDeleteWorkDate( turn ) );

    }
}