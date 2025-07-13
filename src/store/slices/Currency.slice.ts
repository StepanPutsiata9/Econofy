import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
interface CurrencyState {
  rates: Record<string, number> | null;
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
  loadedCurrency: Record<string, number> | Array<string & number>;
  isFull: boolean | null;
}

const API_KEY = '5aa85e109bc74b6ab5b17fdfd67313b4';

const initialState: CurrencyState = {
  rates: null,
  loading: false,
  error: null,
  lastUpdated: null,
  loadedCurrency: [],
  isFull: false,
};

export const fetchCurrencyRates = createAsyncThunk(
  'currency/fetchRates',
  async (baseCurrency: string = 'EUR', { rejectWithValue }) => {
    try {
      const dataCurrency = await axios.get(
        `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${API_KEY}&base=${baseCurrency}`,
      );
      return dataCurrency.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  },
);

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    loadMoreCurrency(state) {
  if (!state.isFull && state.rates) {
    const currentLength = Object.keys(state.loadedCurrency).length;
    const ratesLength = Object.keys(state.rates).length;
    const newEntries = Object.entries(state.rates).slice(
      currentLength,
      currentLength + 10
    );
    
    state.loadedCurrency = {
      ...state.loadedCurrency,
      ...Object.fromEntries(newEntries),
    };

    if (Object.keys(state.loadedCurrency).length >= ratesLength) {
      state.isFull = true;
    }
  }
}
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCurrencyRates.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrencyRates.fulfilled, (state, action) => {
        state.loading = false;
        state.rates = action.payload.rates;
        state.lastUpdated = action.payload.date;
        state.loadedCurrency = action.payload.rates
          ? (Object.fromEntries(
              Object.entries(action.payload.rates).slice(0, 10),
            ) as Record<string, number>)
          : [];
      })
      .addCase(fetchCurrencyRates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { loadMoreCurrency } = currencySlice.actions
export default currencySlice.reducer;
