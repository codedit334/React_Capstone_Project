import { configureStore } from "@reduxjs/toolkit";
import fluctuationDataReducer from "./fluctuationData/fluctuationDataSlice.js";

export default configureStore({
  reducer: {
    fluctuationData: fluctuationDataReducer,
  },
});
