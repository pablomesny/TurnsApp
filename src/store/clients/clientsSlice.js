import { createSlice } from '@reduxjs/toolkit';

// TODO: agregar onLogout cuando kiteas || Payload de initialForm en reset

export const clientsSlice = createSlice({
    name: 'clients',
    initialState: {
        isLoadingClients: false,
        registeredClients: [],
    },
    reducers: {
        onAddNewClient: ( state, { payload } ) => {
            state.registeredClients.push(payload);
        },
        onLogout: ( state ) => {
            state.isLoadingClients = false;
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
        }
    }
});


export const { onAddNewClient, onLogout, onUpdateClient, onDeleteClient, setClients } = clientsSlice.actions;