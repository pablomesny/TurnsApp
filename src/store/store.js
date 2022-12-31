import { configureStore } from "@reduxjs/toolkit";
import { authSlice, clientsSlice, uiSlice, workDatesSlice } from "./";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        clients: clientsSlice.reducer,
        workDates: workDatesSlice.reducer,
        ui: uiSlice.reducer,
    },
});
