import { createSlice } from "@reduxjs/toolkit";


const initialState = [
  { id: '0', name: 'Janifer Lopes' },
  { id: '1', name: 'John Travolta' },
  { id: '3', name: 'Maxim Galkin' },
];


const usersSlice =  createSlice({
  name: 'users',
  initialState,
  reducers: {}
});

export default usersSlice.reducer;