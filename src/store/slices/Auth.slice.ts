import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
 
}

const initialState: AuthState = {

};




const currencySlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

  },
  extraReducers: builder => {
    builder

  },
});

export default currencySlice.reducer;
