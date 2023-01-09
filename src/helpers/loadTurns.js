import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadTurns = async( uid = '' ) => {
    
    if ( !uid ) throw new Error('El UID del usuario no existe');

    const collectionRef = collection( FirebaseDB, `${ uid }/turnsapp/turns` );
    const docs = await getDocs( collectionRef );

    const turns = [];

    docs.forEach( doc => {
        turns.push({ id: doc.id, ...doc.data()});
    })

    return turns;
}