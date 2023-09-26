import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase';
import {
  onAddNewOrder,
  onDeleteOrder,
  onUpdateOrder,
  setOrders
} from './ordersSlice';
import { loadOrders } from '../../helpers/loadOrders';
import { getAutoincrementId } from '../../helpers/autoincrementId';

export const startNewOrder = order => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const newDoc = doc(collection(FirebaseDB, `${uid}/turnsapp/orders`));

    const orderId = await getAutoincrementId(uid, 'orders');

    order.id = newDoc.id;
    order.uniqueId = orderId;
    order.isFinished = false;

    await setDoc(newDoc, order);

    dispatch(onAddNewOrder(order));
  };
};

export const startLoadingOrders = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error('El UID del usuario no existe');

    const orders = await loadOrders(uid);

    dispatch(setOrders(orders));
  };
};

export const startUpdateOrder = order => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const orderToFirestore = { ...order };
    delete orderToFirestore.id;

    const docRef = doc(FirebaseDB, `${uid}/turnsapp/orders/${order.id}`);
    await setDoc(docRef, orderToFirestore, { merge: true });

    dispatch(onUpdateOrder(order));
  };
};

export const startTagAsFinished = order => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const orderToFirestore = { ...order, isFinished: !order.isFinished };
    delete orderToFirestore.id;

    const docRef = doc(FirebaseDB, `${uid}/turnsapp/orders/${order.id}`);
    await setDoc(docRef, orderToFirestore, { merge: true });

    dispatch(onUpdateOrder({ ...order, isFinished: !order.isFinished }));
  };
};
