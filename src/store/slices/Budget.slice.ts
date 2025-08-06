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

interface ICircleItem{
  name:string;
  population:number;
  color:string;
}
export interface IAddBudgetPlanResponse{
  analysis:string;
  id:string;
  recommendations:string[];
  budgetPlan:ICircleItem[]
}
interface BudgetState {
  data: IBudgetPlan[] | null | undefined;
  loading: boolean;
  creatingData: IAddBudgetPlanResponse|null|undefined;
  creatingLoading: boolean;
  error: string | null;
  creatingError: string | null;
  firstAddScreenData: IFirstAddScreenData | null;
}

const initialState: BudgetState = {
  data: null,
  loading: false,
  creatingData: null,
  creatingLoading: false,
  error: null,
  creatingError:null,
  firstAddScreenData: null,
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
      console.log('try to create plan ', { title,
      income_min,
      income_max,
      percents,
      date,
      trips,
      rooms,
      members,
      credit,
      hobby,
      expences,});
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
      console.log('Plan for  ', data);

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
        console.log('pending');
        state.creatingLoading = true;
        state.creatingError = null;
      })
      .addCase(createBudgetPlan.fulfilled, (state, action) => {
        console.log('fullfilled');
        state.creatingLoading = false;
        state.creatingData = action.payload;
      })
      .addCase(createBudgetPlan.rejected, (state, action) => {
        console.log('fail');
        state.creatingLoading = false;
        state.creatingError = action.payload as string;
      });
  },
});

export const { setDataFromFirstAddBudgetScreen } = budgetsSlice.actions;
export default budgetsSlice.reducer;
