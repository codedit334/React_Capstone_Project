import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import ColorPalettes from './pages/ColorPalettes';
import ColorsPage from './pages/ColorsPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<ColorPalettes />} />
      <Route path="/colors/:category" element={<ColorsPage />} />
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
