import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface CurrencyState {
  rates: Record<string, number> | null;
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
  loadedCurrency: Record<string, number>;
  searchedCurrency: Record<string, number>;
  isFull: boolean;
}

const initialState: CurrencyState = {
  rates: null,
  loading: false,
  error: null,
  lastUpdated: null,
  loadedCurrency: {},
  searchedCurrency: {},
  isFull: false,
};

const API_KEY = '5aa85e109bc74b6ab5b17fdfd67313b4';

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
      if (!state.rates || state.isFull) return;

      const currentLength = Object.keys(state.loadedCurrency).length;
      const newEntries = Object.entries(state.rates).slice(
        currentLength,
        currentLength + 10,
      );

      if (newEntries.length === 0) {
        state.isFull = true;
        return;
      }

      state.loadedCurrency = {
        ...state.loadedCurrency,
        ...Object.fromEntries(newEntries),
      };
      const currentSearch = state.searchedCurrency;
      if (
        Object.keys(currentSearch).length <
        Object.keys(state.loadedCurrency).length
      ) {
        state.searchedCurrency = state.loadedCurrency;
      }
    },
    searchCurrency(state, action) {
      if (!action.payload || typeof action.payload !== 'string') {
        state.searchedCurrency = state.loadedCurrency;
        return;
      }

      const searchTerm = action.payload.toLowerCase().trim(); 

      if (!searchTerm) {
        state.searchedCurrency = state.loadedCurrency;
        return;
      }

      state.searchedCurrency = Object.fromEntries(
        Object.entries(state.loadedCurrency).filter(([currencyCode]) =>
          currencyCode.toLowerCase().includes(searchTerm),
        ),
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCurrencyRates.pending, state => {
        state.loading = true;
        state.error = null;
        state.isFull = false;
      })
      .addCase(fetchCurrencyRates.fulfilled, (state, action) => {
        state.loading = false;
        state.rates = action.payload.rates;
        state.lastUpdated = action.payload.date;

        state.loadedCurrency = Object.fromEntries(
          Object.entries(action.payload.rates || {}).slice(0, 10),
        ) as Record<string, number>;

        state.searchedCurrency = state.loadedCurrency;
        state.isFull =
          Object.keys(state.loadedCurrency).length >=
          Object.keys(action.payload.rates || {}).length;
      })
      .addCase(fetchCurrencyRates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { loadMoreCurrency, searchCurrency } = currencySlice.actions;
export default currencySlice.reducer;
