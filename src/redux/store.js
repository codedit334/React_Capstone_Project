import { configureStore } from "@reduxjs/toolkit";
import fluctuationDataReducer from "./fluctuationData/fluctuationDataSlice";

export default configureStore({
  reducer: {
    fluctuationData: fluctuationDataReducer,
  },
});
