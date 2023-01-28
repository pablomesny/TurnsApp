import { createSlice } from '@reduxjs/toolkit';

export const clientsSlice = createSlice({
    name: 'clients',
    initialState: {
        isLoading: true,
        registeredClients: [],
    },
    reducers: {
        onAddNewClient: ( state, { payload } ) => {
            state.registeredClients.push(payload);
        },
        onLogout: ( state ) => {
            state.registeredClients = [];
            state.activeClient = {};
        },
        onUpdateClient: ( state, { payload } ) => {
            state.registeredClients = state.registeredClients.map( client => {
                if( client.id === payload.id ){
                    return payload;
                }
                return client;
            })
        },
        onDeleteClient: ( state, { payload } ) => {
            state.registeredClients = state.registeredClients.filter( client => client.id !== payload.id );
        },
        setClients: ( state, { payload } ) => {
            state.registeredClients = payload;
            state.isLoading = false;
        },
        onResetClients: ( state ) => {
            state.isLoading = true;
            state.registeredClients = [];
        }
    }
});


export const { onAddNewClient, onLogout, onUpdateClient, onDeleteClient, setClients, onResetClients } = clientsSlice.actions;