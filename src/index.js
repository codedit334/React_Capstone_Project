import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './redux/store';
import { Provider } from 'react-redux';
import { fetchColorPalettes } from './redux/colorPalettes/colorPalettesSlice';
import './index.css';
import App from './App';

store.dispatch(fetchColorPalettes());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
