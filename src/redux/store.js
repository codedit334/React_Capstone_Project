import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line import/extensions
import fluctuationDataReducer from './fluctuationData/fluctuationDataSlice.js';

export default configureStore({
  reducer: {
    fluctuationData: fluctuationDataReducer,
  },
});
