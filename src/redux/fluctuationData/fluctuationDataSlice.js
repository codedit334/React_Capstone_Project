import axios from "axios"; // eslint-disable-line
import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';

const startDate = '2020-01-01';
const endDate = '2020-01-04';
const url = `https://api.exchangerate.host/fluctuation?start_date=${startDate}&end_date=${endDate}`;

const initialState = {
  fluctuationData: [],
  startDate,
  endDate,
  status: 'idle',
  error: null,
};

export const fetchFluctuationData = createAsyncThunk(
  'fluctuationData/fetchFluctuationData',
  async () => {
    const response = await axios.get(url);

    const newArr = [];
    Object.keys(response.data.rates).forEach((key) => {
      newArr.push({
        id: nanoid(),
        symbol: key,
        change: response.data.rates[key].change,
        change_pct: response.data.rates[key].change_pct,
      });
    });

    return newArr;
  },
);

const fluctuationSlice = createSlice({
  name: 'fluctuationData',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchFluctuationData.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(fetchFluctuationData.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        fluctuationData: action.payload,
      }))
      .addCase(fetchFluctuationData.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }));
  },
});

export default fluctuationSlice.reducer;
