import { createSlice } from '@reduxjs/toolkit';

export const clientsSlice = createSlice({
    name: 'clients',
    initialState: {
        isLoadingClients: false,
        registeredClients: [],
        activeClient: [],
    },
    reducers: {
        onAddNewClient: ( state, { payload } ) => {
            state.registeredClients.push(payload);
        },
    }
});


// Action creators are generated for each case reducer function
export const { onAddNewClient } = clientsSlice.actions;