import { configureStore } from "@reduxjs/toolkit";
import { authSlice, clientsSlice, turnsSlice, uiSlice } from "./";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        clients: clientsSlice.reducer,
        turns: turnsSlice.reducer,
        ui: uiSlice.reducer,
    },
});
