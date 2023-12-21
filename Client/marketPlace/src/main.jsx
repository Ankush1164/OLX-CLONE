import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createRoot } from "react-dom/client";
import "./index.css"
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Registration from './Components/Registration.jsx';
import Login from './Components/Login.jsx';
import SellProducts from './Components/SellProducts.jsx';
import ProductInfoPage from './Components/ProductInfoPage.jsx';
import LikedProducts from './Components/LikedProducts.jsx';
import MyProducts from './Components/MyProducts.jsx';
import ContactUs from './Components/ContactUs.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element:<App/>,
  },
  {
    path: "register",
    element: <Registration/>,
  },
  {
    path:"login",
    element:<Login/>
  },
  {
    path:"sell",
    element:<SellProducts/>
  },
  {
    path:"productInfo/:id",
    element:<ProductInfoPage/>
  },
  {
    path:"likedProducts",
    element:<LikedProducts/>
  },
  {
    path:"MyProducts",
    element:<MyProducts/>
  },
  {
    path:"ContactUs",
    element:<ContactUs/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
