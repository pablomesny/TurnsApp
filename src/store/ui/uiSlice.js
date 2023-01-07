import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        actualDate: new Date().toLocaleDateString(),
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


// Action creators are generated for each case reducer function
export const {
    onSetActualDate,
    onResetDate,
} = uiSlice.actions;