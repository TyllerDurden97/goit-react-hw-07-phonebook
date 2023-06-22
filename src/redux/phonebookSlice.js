import { createSlice } from "@reduxjs/toolkit";
// import {  persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
import {fetchContactsThunk} from '../search/thunks'

// const persistConfig = {
//    key: 'persistPhonebook',
//    storage,
//    whitelist: ['contacts'],
// };

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
   console.log(payload)
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
   },   
});

export const contactsReducer = phonebookSlice.reducer
export const { addContact, filterContacts, deleteContact } = phonebookSlice.actions;


// export const phonebookSlice = createSlice({
//    name: 'phonebook',
//    initialState,
//    reducers: {
//       addContact: (state, { payload }) => {
//          state.contacts.push(payload)
//       },
//       filterContacts: (state, { payload }) => {
//          state.filter = payload
//       },
//       deleteContact: (state, { payload }) => {
//          state.contacts = state.contacts.filter(contact => contact.id !== payload)
//       }
//    },   
// });

// export const persistedPhonebookReducer = persistReducer(persistConfig, phonebookSlice.reducer);
