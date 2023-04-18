import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import FluctuationData from "./pages/FluctuationData";
import CurrencyRate, { currenciesLoader } from "./pages/CurrencyRate";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<FluctuationData />} />
      <Route
        path="/currency/:symbol"
        loader={currenciesLoader}
        element={<CurrencyRate />}
      />
    </Route>
  )
);
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
