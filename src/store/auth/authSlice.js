import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authenticated',
        uid: null,
        displayName: null,
        errorMessage: null
    },
    reducers: {
        checkingCredentials: ( state ) => {
            state.status = 'checking';
            state.uid = null;
            state.displayName = null;
            state.errorMessage = null;
        },
        login: ( state, { payload } ) => {
            const { uid, displayName } = payload;
            state.status = 'authenticated';
            state.uid = uid;
            state.displayName = displayName;
        },
        logout: ( state, { payload } ) => {
            state.status = 'not-authenticated';
            state.uid = null;
            state.displayName = null;
            state.errorMessage = payload;
        }
    }
});


// Action creators are generated for each case reducer function
export const { checkingCredentials, login, logout } = authSlice.actions;