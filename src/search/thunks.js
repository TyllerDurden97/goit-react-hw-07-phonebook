import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

axios.defaults.baseURL = `https://64930cbd428c3d2035d13db8.mockapi.io`;

export const fetchContactsThunk = createAsyncThunk(
   'contacts/fetchAll',
   async (_, {rejectWithValue}) => {
      try {
         const dataContacts = await axios.get(`/contacts`);
         return dataContacts.data;
      } catch (error) {
         return rejectWithValue(error)
      }
   },
);

export const addContactThunk = createAsyncThunk(
  'contacts/addContact',
   async ( newContact, { rejectWithValue }) => {
    try {
      const response = await axios.post('/contacts', newContact);
       toast.success("Added Successfully");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteContactThunk = createAsyncThunk(
  'contacts/deleteContact',
  async ( id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/contacts/${id}`);
       toast.success("Contact Deleted");
       return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


