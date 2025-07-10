import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
interface CurrencyState {
  rates: Record<string, number> | null;
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

const API_KEY = '5aa85e109bc74b6ab5b17fdfd67313b4';

const initialState: CurrencyState = {
  rates: null,
  loading: false,
  error: null,
  lastUpdated: null,
};

export const fetchCurrencyRates = createAsyncThunk(
  'currency/fetchRates',
  async (baseCurrency: string = 'USD', { rejectWithValue }) => {
    try {
        const dataCurrency = await axios.get(
          `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${API_KEY}&base=${baseCurrency}`,
        );
      //   const metaData=await axios.get(`https://api.currencyfreaks.com/currency/list?apikey=${API_KEY}`)
        return [dataCurrency.data];

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
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCurrencyRates.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrencyRates.fulfilled, (state, action) => {
        state.loading = false;
        state.rates = action.payload[0].rates;
        state.lastUpdated = action.payload[0].date;
      })
      .addCase(fetchCurrencyRates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default currencySlice.reducer;
