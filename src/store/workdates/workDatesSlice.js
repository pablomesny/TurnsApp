import { createSlice } from '@reduxjs/toolkit';

export const workDatesSlice = createSlice({
    name: 'workDates',
    initialState: {
        isLoadingDates: false,
        dates: [],
        activeDate: [],
    },
    reducers: {
        onAddNewDate: ( state, { payload } ) => {
            state.dates.push( payload );
        },
        setActiveDate: (state, { payload } ) => {
            state.activeDate = payload;
        }
    },
});


// Action creators are generated for each case reducer function
export const { onAddNewDate, setActiveDate } = workDatesSlice.actions;