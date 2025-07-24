import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './AuthSlice/api';
// import axios from 'axios';

export interface Target {
  title: string;
  date: string;
  savedMoney: number;
  allMoney: number;
  id:string;
}
interface HomeState {
  data: Target[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: HomeState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchAllGoal = createAsyncThunk(
  'home/fetchAllGoal',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('goal/all');
      console.log(data);
      if(data===null){
        return rejectWithValue("404");
      }
      return data;
    
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  },
);

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllGoal.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllGoal.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllGoal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {} = homeSlice.actions;
export default homeSlice.reducer;
