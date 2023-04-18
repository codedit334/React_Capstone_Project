import React from "react";
import ReactDOM from "react-dom/client";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import { fetchFluctuationData } from "./redux/fluctuationData/fluctuationDataSlice.js";
import "./index.css";
import App from "./App.js";

store.dispatch(fetchFluctuationData());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
