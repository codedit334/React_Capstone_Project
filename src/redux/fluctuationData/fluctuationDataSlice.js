import axios from "axios"; // eslint-disable-line
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const start_date = "2020-01-01";
const end_date = "2020-01-04";
const url =
  `https://api.exchangerate.host/fluctuation?start_date=${start_date}&end_date=${end_date}&places=4`;

const initialState = {
  fluctuationData: [],
  start_date,
  end_date,
  status: "idle",
  error: null,
};

export const fetchFluctuationData = createAsyncThunk(
  "fluctuationData/fetchFluctuationData",
  async (initialState) => {
    const response = await axios.get(url);
    // const  response =  axios.post(url, {
    //     "model":"default"
    //   }, {
    //     headers: {
    //       'Content-Type': null
    //     }
    //   });
    const newArr = [];
    Object.keys(response.data.rates).forEach(function (key, index) {
      newArr.push({
        symbol: key,
        change: response.data.rates[key].change,
        change_pct: response.data.rates[key].change_pct,
      });
    });

    return newArr;
  }
);

const fluctuationSlice = createSlice({
  name: "fluctuationData",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchFluctuationData.pending, (state) => ({
        ...state,
        status: "loading",
      }))
      .addCase(fetchFluctuationData.fulfilled, (state, action) => ({
        ...state,
        status: "succeeded",
        fluctuationData: action.payload,
      }))
      .addCase(fetchFluctuationData.rejected, (state, action) => ({
        ...state,
        status: "failed",
        error: action.error.message,
      }));
  },
});

export default fluctuationSlice.reducer;
