import axios from "axios"; // eslint-disable-line
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const url = 'http://colormind.io/list/';
// const url = 'http://colormind.io/api/';

const initialState = {
  colorPalettes: [],
  status: 'idle',
  error: null,
};

export const fetchColorPalettes = createAsyncThunk(
  'colorPalettes/fetchColorPalettes',
  async (initialState) => {
    const response = await axios.get(url);
    // const  response =  axios.post(url, {
    //     "model":"default"
    //   }, {
    //     headers: {
    //       'Content-Type': null
    //     }
    //   });

    return response.data.result;
  },
);

const colorPalettesSlice = createSlice({
  name: 'colorPalettes',
  initialState,
  reducers: { },

  extraReducers(builder) {
    builder
      .addCase(fetchColorPalettes.pending, (state) => ({ ...state, status: 'loading' }))
      .addCase(fetchColorPalettes.fulfilled, (state, action) => ({ ...state, status: 'succeeded', colorPalettes: action.payload }))
      .addCase(fetchColorPalettes.rejected, (state, action) => ({ ...state, status: 'failed', error: action.error.message }));
  },
});

export default colorPalettesSlice.reducer;
