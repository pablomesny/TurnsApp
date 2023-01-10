import { createSlice } from '@reduxjs/toolkit';

// TODO: Payload de initialForm en reset

export const workDatesSlice = createSlice({
    name: 'workDates',
    initialState: {
        isSaving: false,
        messageSaved: '',
        dates: [],
    },
    reducers: {
        setTurns: ( state, { payload } ) => {
            state.dates = payload;
        },
        onAddNewDate: ( state, { payload } ) => {
            state.dates.push( payload );
        },
        onUpdateWorkDate: ( state, { payload } ) => {
            state.dates = state.dates.map( date => {
                if( date.id === payload.id ){
                    return payload;
                }
                return date;
            })
        },
        onDeleteWorkDate: ( state, { payload } ) => {
            state.dates = state.dates.filter( date => date.id !== payload.id );
        }
    },
});


// Action creators are generated for each case reducer function
export const { onAddNewDate, onUpdateWorkDate, onDeleteWorkDate, setTurns } = workDatesSlice.actions;