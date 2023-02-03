import React from 'react';
import ReactDOM from 'react-dom/client';
import {QueryClientProvider, QueryClient} from 'react-query';
import './index.css';
import App from './App';
import CompanySetting from './pages/company_setting';
import User from './components/user';
import ErrorPage from './components/error_page';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/company-settings',
    element: <CompanySetting />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/company-settings/user',
        element: <User />,
      },
    ],
  },
]);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
