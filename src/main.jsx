import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './assets/components/Root.jsx';
import Error from './assets/components/Error.jsx';
import Home from './assets/components/Home.jsx';
import Login from './assets/components/Login.jsx';
import Register from './assets/components/Register.jsx';
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './assets/components/providers/AuthProvider.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element:<Root></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/login",
        element: <Login></Login> ,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ]
  },
]);
createRoot(document.getElementById('root')).render(
 <HelmetProvider>
   <AuthProvider>
   <RouterProvider router={router} />
   </AuthProvider>
 </HelmetProvider>,
)
