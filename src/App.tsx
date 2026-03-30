import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import EntryPoint from './pages/EntryPoint';
import Login from './pages/login';
import Callback from './pages/callback';
import Dados from './pages/Dados';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EntryPoint />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/oauth/callback" element={<Callback/>} />
        <Route path="/localidade/:id" element={<Dados />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;