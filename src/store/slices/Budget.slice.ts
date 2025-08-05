import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from './AuthSlice/api';
import {Categories} from "../../screens/BudgetStack/BudgetScreen/BudgetPlan/AddSpendingModal/AddSpendingModal.tsx"
export interface IBudgetPlan {
  title: string;
  date: string;
  spentMoney: number;
  limitMoney: number;
  remainder: number;
  term: string;
  id: string;
}
interface BudgetState {
  data: IBudgetPlan[] | null | undefined;
  loading: boolean;
  error: string | null;
}

const initialState: BudgetState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchAllPlans = createAsyncThunk(
  'budget/fetchAllPlans',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('plan');
      console.log("Budgets ",data);
      
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

interface addSpendItem {
  id: string;
  spendedMoney: number;
  category:Categories;
  date:Date
}
export const addSpendingToPlan = createAsyncThunk(
  'budget/addSpendingToPlan',
  async ({ id, spendedMoney,category,date}: addSpendItem, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `plan/addSpending/${id}`,
        JSON.stringify({ spendedMoney: spendedMoney,category:category,date:date }),
      );
      if (response.data === null) {
        return rejectWithValue('404');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  },
);
const budgetsSlice = createSlice({
  name: 'budgets',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllPlans.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPlans.fulfilled, (state, action) => {
        state.loading = false;       
        state.data = action.payload;
      })
      .addCase(fetchAllPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })



      .addCase(addSpendingToPlan.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSpendingToPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data?.map(item =>
          item.id === action.payload.id ? action.payload : item,
        );
      })
      .addCase(addSpendingToPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {} = budgetsSlice.actions;
export default budgetsSlice.reducer;
