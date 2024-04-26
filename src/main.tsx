import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
//import Counter from './components/counter.jsx'
import Addpizza from './components/Addpizza.jsx'
import { createRoot } from "react-dom/client";
import UpdatePizza from './components/UpdatePizza.jsx'
import DefaultPizza from './components/DefaultPizza.jsx'
//import BarGraph from './components/BarGraph.jsx'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
//import BarGraph from './components/BarGraph.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  
  {
    path: "add-pizza",
    element: <Addpizza />,
  },
  {
    path: "update-pizza/:id",
    element: <DefaultPizza />
  }
]);
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  //<React.StrictMode>
    <RouterProvider router={router} />
  //</React.StrictMode>,
)
