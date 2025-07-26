import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './AuthSlice/api';
// import axios from 'axios';

export interface Target {
  title: string;
  date: string;
  savedMoney: number;
  allMoney: number;
  id: string;
}
interface HomeState {
  data: any[] | Target[] | null | undefined;
  loading: boolean;
  error: string | null;
}

interface UpdateGoal {
  id: string;
  savedMoney: number;
}
const initialState: HomeState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchAllGoals = createAsyncThunk(
  'home/fetchAllGoals',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('goal/all');
      if (data === null) {
        return rejectWithValue('404');
      }
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  },
);

export const deleteGoal = createAsyncThunk(
  'home/deleteGoal',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await api.delete('goal/delete', {
        data: { id: id },
      });

      if (data === null) {
        return rejectWithValue('404');
      }
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  },
);

export const updateGoal = createAsyncThunk(
  'home/updateGoal',
  async ({ id, savedMoney }: UpdateGoal, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        'goal/update',
        JSON.stringify({ id: id, savedMoney: savedMoney }),
      );
      if (response.data === null) {
        console.log(response);
        return rejectWithValue('404');
      }
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  },
);

export const minusGoal = createAsyncThunk(
  'home/minusGoal',
  async ({ id, savedMoney }: UpdateGoal, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        'goal/minus',
        JSON.stringify({ id: id, savedMoney: savedMoney }),
      );
      if (response.data === null) {
        console.log(response);
        return rejectWithValue('404');
      }
      console.log(response);

      return response.data;
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

      .addCase(fetchAllGoals.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllGoals.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllGoals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })



      .addCase(deleteGoal.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })



      .addCase(updateGoal.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateGoal.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data?.map(item =>
          item.id === action.payload.id ? action.payload : item,
        );
      })
      .addCase(updateGoal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })


    
      .addCase(minusGoal.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(minusGoal.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data?.map(item =>
          item.id === action.payload.id ? action.payload : item,
        );
      })
      .addCase(minusGoal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;        
      });
    
  }
});

export const {} = homeSlice.actions;
export default homeSlice.reducer;
