import { createSlice } from '@reduxjs/toolkit';

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    registeredOrders: [],
    isLoading: true
  },
  reducers: {
    setOrders: (state, { payload }) => {
      state.registeredOrders = payload;
      state.isLoading = false;
    },
    onAddNewOrder: (state, { payload }) => {
      state.registeredOrders.push(payload);
    },
    onUpdateOrder: (state, { payload }) => {
      state.registeredOrders = state.registeredOrders.map(order => {
        if (order.id === payload.id) {
          return payload;
        }
        return order;
      });
    },
    onDeleteOrder: (state, { payload }) => {
      state.registeredOrders = state.registeredOrders.filter(
        order => order.id !== payload.id
      );
    }
  }
});

export const { setOrders, onAddNewOrder, onUpdateOrder, onDeleteOrder } =
  ordersSlice.actions;
