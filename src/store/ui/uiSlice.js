import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        actualDate: []
    },
    reducers: {
        onSetActualDate: ( state, { payload } ) => {
            state.actualDate = payload;
        },
        onResetDate: ( state ) => {
            state.actualDate = new Date().toLocaleDateString();
        }
    }
});


export const {
    onSetActualDate,
    onResetDate,
} = uiSlice.actions;