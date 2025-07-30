import { createSlice } from '@reduxjs/toolkit';



interface HomeState {
  data: any[] | null | undefined;
  loading: boolean;
  error: string | null;
}


const initialState: HomeState = {
  data: null,
  loading: false,
  error: null,
};


const budgetsSlice = createSlice({
  name: 'budgets',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder

  },
});

export const {} = budgetsSlice.actions;
export default budgetsSlice.reducer;
