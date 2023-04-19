import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/extensions
import store from './redux/store.js';
// eslint-disable-next-line import/extensions
import { fetchFluctuationData } from './redux/fluctuationData/fluctuationDataSlice.js';
import './index.css';
// eslint-disable-next-line import/extensions
import App from './App.js';

store.dispatch(fetchFluctuationData());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
