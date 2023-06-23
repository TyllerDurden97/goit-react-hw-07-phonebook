import { createSlice } from "@reduxjs/toolkit";
import { fetchContactsThunk, addContactThunk, deleteContactThunk } from '../search/thunks'

const initialState = {
   contacts:  {
    items: [],
    isLoading: false,
    error: null
  },
   filter: '',
};
const handlePendingContacts = (state) => {
	state.contacts.isLoading = true
	state.contacts.error = ''
}

const handleFulfilledContacts = (state, { payload }) => {
   state.contacts.isLoading = false
   state.contacts.items = payload
}

const handleFulfilledAddContact = (state, { payload }) => {
   state.contacts.isLoading = false
   state.contacts.items = [...state.contacts.items, payload]
}
   
const handleFulfilledDeleteContact = (state, { payload }) => {
   state.contacts.isLoading = false
   state.contacts.items = state.contacts.items.filter(contact => contact.id !== payload.id)
}

const handleRejectedContacts = (state, { payload }) => {
	state.contacts.isLoading = false
	state.contacts.error = payload
}

export const phonebookSlice = createSlice({
   name: 'phonebook',
   initialState,
   reducers: {
      filterContacts: (state, { payload }) => {
         state.filter = payload
      }
   },
   extraReducers: (builder) => {
		builder
         .addCase(fetchContactsThunk.pending, handlePendingContacts)
         .addCase(fetchContactsThunk.fulfilled, handleFulfilledContacts)
         .addCase(fetchContactsThunk.rejected, handleRejectedContacts)
         .addCase(addContactThunk.pending, handlePendingContacts)
         .addCase(addContactThunk.fulfilled, handleFulfilledAddContact)
         .addCase(addContactThunk.rejected, handleRejectedContacts)
         .addCase(deleteContactThunk.pending, handlePendingContacts)
         .addCase(deleteContactThunk.fulfilled, handleFulfilledDeleteContact)
         .addCase(deleteContactThunk.rejected, handleRejectedContacts)
   },   
});

export const contactsReducer = phonebookSlice.reducer
export const { filterContacts } = phonebookSlice.actions;
