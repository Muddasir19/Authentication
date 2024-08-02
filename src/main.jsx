import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


import { RouterProvider ,createBrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux'
import { store } from './store/store.js'

import Home from './components/Home/Home.jsx'
import Login from './components/Login/Login.jsx'
import Register from './components/Register/Register.jsx'
import Profile from './components/Profile/Profile.jsx'
import ChangePassword from './components/ChangePassword.jsx'

 



const router =  createBrowserRouter ([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path:"/profile/:user_id",
    element:<Profile/>,
  },
  
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
    <RouterProvider router = {router} >

    <App /> 
      
    </RouterProvider>
    </Provider>

    
  </>,
)
