import { collection, doc, getDocs, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase';

export const getAutoincrementId = async (uid = '', collectionName) => {
  const collectionRef = collection(
    FirebaseDB,
    `${uid}/turnsapp/${collectionName.toLowerCase()}Id`
  );
  const docs = await getDocs(collectionRef);

  if (docs.empty) {
    const newDocRef = doc(collectionRef);
    await setDoc(newDocRef, { id: 1 });
    return 1;
  }

  const docArray = docs.docs.map(doc => doc.data());

  const sortedDocs = docArray.sort((a, b) => a.id - b.id);
  const lastDoc = sortedDocs[sortedDocs.length - 1];

  const newDocRef = doc(collectionRef);
  await setDoc(newDocRef, { id: lastDoc.id + 1 });

  return lastDoc.id + 1;
};
