import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase";

export const loadClients = async( uid = '' ) => {
    
    if ( !uid ) throw new Error('El UID del cliente no existe');

    const collectionRef = collection( FirebaseDB, `${ uid }/turnsapp/clients` );
    const docs = await getDocs( collectionRef );

    const clients = [];

    docs.forEach( doc => {
        clients.push({ id: doc.id, ...doc.data()});
    })

    return clients;
}