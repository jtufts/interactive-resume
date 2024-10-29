import React, {useEffect, useState} from 'react';
import {Outlet, Route, Routes, BrowserRouter as Router, RouterProvider, Switch, createBrowserRouter} from 'react-router-dom';
import { IconButton } from '@mui/material';
import Home from './Home.js';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar.js';
import logo from './logo.svg';
import './App.css';


const router = createBrowserRouter([
  { path: "*", element: <Root /> }
])

export default function App() {
  return <RouterProvider router={router} />
};

function Root() {

  return (
      <Routes>
        <Route element={<Layout />}>
          <Route exact path="/" element={<Home />} />
        </Route>
      </Routes>
  );
}

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    console.log(menuOpen);
  }, [menuOpen])

  return (
    <div className="app">
      <Outlet />
    </div>
  )
}


