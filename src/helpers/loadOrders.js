import { collection, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase';

export const loadOrders = async (uid = '') => {
  if (!uid) throw new Error('El UID del usuario no existe');

  const collectionRef = collection(FirebaseDB, `${uid}/turnsapp/orders`);
  const docs = await getDocs(collectionRef);

  const orders = [];

  docs.forEach(doc => {
    orders.push({ id: doc.id, ...doc.data() });
  });

  return orders;
};
