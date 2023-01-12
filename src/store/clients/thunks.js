import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadClients } from "../../helpers";
import { onAddNewClient, onDeleteClient, onUpdateClient, setClients } from "./clientsSlice";

export const startNewClient = ( client ) => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        const newDoc = doc( collection( FirebaseDB, `${ uid }/turnsapp/clients`));
        await setDoc( newDoc, client );

        client.id = newDoc.id;

        dispatch(onAddNewClient(client));
    }
}

export const startLoadingClients = () => {
    return async(dispatch, getState) => {

        const { uid } = getState().auth;
        if( !uid ) throw new Error('El UID del cliente no existe');

        const clients = await loadClients(uid);

        dispatch(setClients(clients));
    }
}

export const startUpdateClients = ( client ) => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        const clientToFirestore = { ...client };
        delete clientToFirestore.id;

        const docRef = doc( FirebaseDB, `${ uid }/turnsapp/clients/${ client.id }`);
        await setDoc( docRef, clientToFirestore, { merge: true });

        dispatch( onUpdateClient(client) );

    }
}

export const startDeleteClient = ( client ) => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        const docRef = doc( FirebaseDB, `${ uid }/turnsapp/clients/${ client.id }`);
        await deleteDoc(docRef);

        dispatch( onDeleteClient( client ) );

    }
}