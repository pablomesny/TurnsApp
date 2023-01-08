import { createSlice } from '@reduxjs/toolkit';

// TODO: agregar onLogout cuando kiteas || Payload de initialForm en reset

export const clientsSlice = createSlice({
    name: 'clients',
    initialState: {
        isLoadingClients: false,
        registeredClients: [],
        activeClient: {},
    },
    reducers: {
        onAddNewClient: ( state, { payload } ) => {
            state.registeredClients.push(payload);
        },
        onLogout: ( state ) => {
            state.isLoadingClients = false;
            state.registeredClients = [];
            state.activeClient = null;
        },
        setActiveClient: ( state, { payload } ) => {
            state.activeClient = payload;
        },
        onUpdateClient: ( state, { payload } ) => {
            state.registeredClients = state.registeredClients.map( client => {
                if( client.uid === payload.uid ){
                    return payload;
                }
                return client;
            })
        },
        onResetActiveClient: ( state ) => {
            state.activeClient = null;
        },
        onDeleteClient: ( state, { payload } ) => {
            state.registeredClients = state.registeredClients.filter( client => client.uid !== payload.uid );
        }
    }
});


// Action creators are generated for each case reducer function
export const { onAddNewClient, onLogout, setActiveClient, onUpdateClient, onResetActiveClient, onDeleteClient } = clientsSlice.actions;