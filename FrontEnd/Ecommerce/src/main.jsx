import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Components/Root/Root.jsx';
import AuthProvider from './Components/AuthProvider/AuthProvider.jsx';
import Register from './Components/Register/Register.jsx';
import Login from './Components/Login/Login.jsx'
import PrivateRoute from './Components/PrivateRoute/PrivateRoute.jsx';
import Cart from './Components/Cart/Cart.jsx';
import Shop from './Components/Shop/Shop.jsx';
import Support from './Components/Support/Support.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root></Root>,
    children: [
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/cart',
        element: <PrivateRoute><Cart></Cart></PrivateRoute>
      },
      {
        path: '/shop',
        element: <Shop></Shop>
      },
      {
        path: '/support',
        element: <Support></Support>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
