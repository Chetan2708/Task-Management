import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Layout from './Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Auth from './pages/Auth.jsx';
export const baseUrl = "http://localhost:8000"

const router = createBrowserRouter(
  [
    {
      path:"",
      element:<Auth/>
    },
    {
      path: "/dashboard",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Dashboard />
        }
      ]
    },
  ]
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
