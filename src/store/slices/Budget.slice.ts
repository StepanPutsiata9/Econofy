import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from './AuthSlice/api';
import { Categories } from '../../screens/BudgetStack/BudgetScreen/BudgetPlan/AddSpendingModal/AddSpendingModal.tsx';
export interface IBudgetPlan {
  title: string;
  date: string;
  spentMoney: number;
  limitMoney: number;
  remainder: number;
  term: string;
  id: string;
}
export interface IFirstAddScreenData {
  budgetName: string;
  date: string;
  salary: number;
  safeSumm: number;
}

interface ICircleItem {
  name: string;
  population: number;
  color: string;
}

export interface IExpenses {
  id: string;
  category: string;
  expense: string;
  createdAt:string;
}
export interface ISpendingInfo {
  id: string;
  category: string;
  expenses: IExpenses[];
}
export interface IAddBudgetPlanResponse {
  analysis: string;
  id: string;
  recommendations: string[];
  budgetPlan: ICircleItem[];
}
interface BudgetState {
  data: IBudgetPlan[] | null | undefined;
  loading: boolean;
  creatingData: IAddBudgetPlanResponse | null | undefined;
  creatingLoading: boolean;
  error: string | null;
  creatingError: string | null;
  firstAddScreenData: IFirstAddScreenData | null;
  planAllInfo: IPlanAllInfo | null;
  planInfoLoading: boolean;
  planInfoError: string | null;

  spendingInfo: ISpendingInfo | null;
  spendingError: string | null;
  spendingLoading: boolean;
}

const initialState: BudgetState = {
  data: null,
  loading: false,
  creatingData: null,
  creatingLoading: false,
  error: null,
  creatingError: null,
  firstAddScreenData: null,
  planAllInfo: null,
  planInfoLoading: false,
  planInfoError: null,
  spendingInfo: null,
  spendingError: null,
  spendingLoading: false,
};

export const fetchAllPlans = createAsyncThunk(
  'budget/fetchAllPlans',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('plan');
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

export type SpendingCardItem = {
  title: string;
  spendingCount: number;
  spendingMoney: number;
};
export interface IPlanAllInfo {
  analysis: string;
  recommendations: string[];
  budgetPlan: ICircleItem[];
  expenses: SpendingCardItem[];
  title: string;
  id: string;
}
export const fetchPlanAllInfo = createAsyncThunk(
  'budget/fetchPlanAllInfo',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`plan/${id}`);

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

export interface ICreateBudgetItem {
  title: string;
  income_min: number;
  income_max: number;
  percents: number;
  date: string;
  trips: number;
  rooms: number;
  members: number;
  credit: string;
  hobby: string;
  expences: string;
}
export const createBudgetPlan = createAsyncThunk(
  'budget/createBudgetPlan',
  async (
    {
      title,
      income_min,
      income_max,
      percents,
      date,
      trips,
      rooms,
      members,
      credit,
      hobby,
      expences,
    }: ICreateBudgetItem,
    { rejectWithValue },
  ) => {
    try {
      const { data } = await api.post(
        'plan',
        JSON.stringify({
          title,
          income_min,
          income_max,
          percents,
          date,
          trips,
          rooms,
          members,
          credit,
          hobby,
          expences,
        }),
      );
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
  category: Categories;
}
export const addSpendingToPlan = createAsyncThunk(
  'budget/addSpendingToPlan',
  async ({ id, spendedMoney, category }: addSpendItem, { rejectWithValue }) => {
    try {
      console.log({ expenses: spendedMoney, category: category });
      const response = await api.patch(
        `plan/${id}`,
        JSON.stringify({ expenses: spendedMoney, category: category }),
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

export const addFinalNewPlan = createAsyncThunk(
  'budget/addFinalNewPlan',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`plan/end/${id}`);
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

export const deletePlan = createAsyncThunk(
  'home/deletePlan',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`plan/${id}`);
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

interface IFetchSpendingInfo {
  id: string;
  category: string;
}

export const fetchSpendingInfo = createAsyncThunk(
  'budget/fetchSpendingInfo',
  async ({ id, category }: IFetchSpendingInfo, { rejectWithValue }) => {
    try {      
      const { data } = await api.post(`plan/expenses/${id}`,  JSON.stringify({category:category}));

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
const budgetsSlice = createSlice({
  name: 'budgets',
  initialState,
  reducers: {
    setDataFromFirstAddBudgetScreen(state, action) {
      state.firstAddScreenData = {
        budgetName: action.payload.budgetName,
        salary: action.payload.salary,
        safeSumm: action.payload.safeSumm,
        date: action.payload.date,
      };
    },
    clearCreatingData(state) {
      state.creatingData = null;
      state.firstAddScreenData = null;
    },
  },

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
        console.log(action.payload);
      })

      .addCase(createBudgetPlan.pending, state => {
        state.creatingLoading = true;
        state.creatingError = null;
      })
      .addCase(createBudgetPlan.fulfilled, (state, action) => {
        state.creatingLoading = false;
        state.creatingData = action.payload;
      })
      .addCase(createBudgetPlan.rejected, (state, action) => {
        state.creatingLoading = false;
        state.creatingError = action.payload as string;
      })

      .addCase(addFinalNewPlan.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFinalNewPlan.fulfilled, (state, action) => {
        state.loading = false;
        if (state.data) {
          state.data.push(action.payload);
        } else {
          state.data = [action.payload];
        }
      })
      .addCase(addFinalNewPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchPlanAllInfo.pending, state => {
        state.planInfoLoading = true;
        state.planInfoError = null;
      })
      .addCase(fetchPlanAllInfo.fulfilled, (state, action) => {
        state.planInfoLoading = false;
        state.planAllInfo = action.payload;
      })
      .addCase(fetchPlanAllInfo.rejected, (state, action) => {
        state.planInfoLoading = false;
        state.planInfoError = action.payload as string;
      })

      .addCase(deletePlan.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePlan.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deletePlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchSpendingInfo.pending, state => {
        state.spendingLoading = true;
        state.spendingError = null;
      })
      .addCase(fetchSpendingInfo.fulfilled, (state, action) => {
        console.log("spending data ", action.payload);
        state.spendingLoading = false;
        state.spendingInfo = action.payload;
      })
      .addCase(fetchSpendingInfo.rejected, (state, action) => {
        console.log("spending erorr ", action.payload);

        state.spendingLoading = false;
        state.spendingError = action.payload as string;
      });
  },
});

export const { setDataFromFirstAddBudgetScreen, clearCreatingData } =
  budgetsSlice.actions;
export default budgetsSlice.reducer;
