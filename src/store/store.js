import { configureStore } from '@reduxjs/toolkit';
import { authSlice, clientsSlice, turnsSlice, uiSlice } from './';
import { ordersSlice } from './orders/ordersSlice';
import thunkMiddleware from 'redux-thunk';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    clients: clientsSlice.reducer,
    orders: ordersSlice.reducer,
    turns: turnsSlice.reducer,
    ui: uiSlice.reducer
  },
  middleware: [thunkMiddleware]
});
