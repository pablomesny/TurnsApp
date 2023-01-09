import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadTurns } from "../../helpers";
import { onAddNewDate, setTurns } from "./workDatesSlice";

export const startNewWorkDate = ( turn ) => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        const newDoc = doc( collection( FirebaseDB, `${ uid }/turnsapp/turns`));
        await setDoc( newDoc, turn );

        turn.id = newDoc.id;

        console.log(turn);

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