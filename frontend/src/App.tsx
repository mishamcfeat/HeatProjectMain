import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/search',
    element: <SearchPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
