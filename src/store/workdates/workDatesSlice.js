import { createSlice } from '@reduxjs/toolkit';

export const workDatesSlice = createSlice({
    name: 'workDates',
    initialState: {
        isLoadingDates: false,
        dates: [],
        activeWorkDate: {
            
        },
    },
    reducers: {
        onAddNewDate: ( state, { payload } ) => {
            state.dates.push( payload );
        },
        onUpdateWorkDate: ( state, { payload } ) => {
            state.dates = state.dates.filter( date => date.uid !== payload.uid );
            state.dates.push( payload );
        },
        setActiveWorkDate: (state, { payload } ) => {
            state.activeWorkDate = payload;
        },
        onResetActiveWorkDate: ( state ) => {
            state.activeWorkDate = {};
        },
        onDeleteWorkDate: ( state, { payload } ) => {
            state.dates = state.dates.filter( date => date.uid !== payload.uid );
        }
    },
});


// Action creators are generated for each case reducer function
export const { onAddNewDate, setActiveWorkDate, onResetActiveWorkDate, onUpdateWorkDate, onDeleteWorkDate } = workDatesSlice.actions;