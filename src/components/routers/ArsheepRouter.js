import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { PageCliente } from '../pages/PageCliente';
import { Login } from '../login/Login';
import { Layout } from '../Layout/Layout';

export const ArsheepRouter = () => {
  return (
    <div className="content-browser">

      <h1>HOLAAAAAA</h1>
      <BrowserRouter>

        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/Clientes" element={<Layout />} />
          <Route path="*" element={(<><h1>Error 404</h1><strong>Esta Pagina no existe</strong></>)} />
          

        </Routes>

      </BrowserRouter>
    </div>
  )
}
