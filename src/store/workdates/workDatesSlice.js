import { createSlice } from '@reduxjs/toolkit';

// TODO: Payload de initialForm en reset

export const workDatesSlice = createSlice({
    name: 'workDates',
    initialState: {
        isLoadingDates: false,
        dates: [],
        activeWorkDate: null
    },
    reducers: {
        onAddNewDate: ( state, { payload } ) => {
            state.dates.push( payload );
        },
        onUpdateWorkDate: ( state, { payload } ) => {
            state.dates = state.dates.map( date => {
                if( date.uid === payload.uid ){
                    return payload;
                }
                return date;
            })
        },
        setActiveWorkDate: (state, { payload } ) => {
            state.activeWorkDate = payload;
        },
        onResetActiveWorkDate: ( state ) => {
            state.activeWorkDate = null;
        },
        onDeleteWorkDate: ( state, { payload } ) => {
            state.dates = state.dates.filter( date => date.uid !== payload.uid );
        },
    },
});


// Action creators are generated for each case reducer function
export const { onAddNewDate, setActiveWorkDate, onResetActiveWorkDate, onUpdateWorkDate, onDeleteWorkDate } = workDatesSlice.actions;