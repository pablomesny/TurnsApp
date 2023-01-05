import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        actualDate: new Date().toLocaleDateString(),
        isDatesModalOpen: false,
        isClientsModalOpen: false,
    },
    reducers: {
        onOpenDatesModal: ( state ) => {
            state.isDatesModalOpen = true;
        },
        onCloseDatesModal: ( state ) => {
            state.isDatesModalOpen = false;
        },
        onOpenClientsModal: ( state ) => {
            state.isClientsModalOpen = true;
        },
        onCloseClientsModal: ( state ) => {
            state.isClientsModalOpen = false;
        },
        onSetActualDate: ( state, { payload } ) => {
            state.actualDate = payload;
        }
    }
});


// Action creators are generated for each case reducer function
export const {
    onCloseClientsModal,
    onCloseDatesModal,
    onOpenClientsModal,
    onOpenDatesModal,
    onSetActualDate,
} = uiSlice.actions;