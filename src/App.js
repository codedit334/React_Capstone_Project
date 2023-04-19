import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
// eslint-disable-next-line import/extensions
import FluctuationData from './pages/FluctuationData.js';
// eslint-disable-next-line import/extensions
import CurrencyRate, { currenciesLoader } from './pages/CurrencyRate.js';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<FluctuationData />} />
      <Route
        path="/currency/:symbol"
        loader={currenciesLoader}
        element={<CurrencyRate />}
      />
    </Route>,
  ),
);
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
