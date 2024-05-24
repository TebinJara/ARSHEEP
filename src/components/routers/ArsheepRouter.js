import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ClienteDashboard from '../pages/PageCliente';
import { Login } from '../login/Login';
import { Layout } from '../Layout/Layout';
import { PageOT } from '../OT/PageOT';
import { FormularioOT } from '../OT/FormularioOT';

export const ArsheepRouter = () => {
  return (
    <div className="content-browser">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Layout/*" element={<Layout />}>
            <Route path="Clientes" element={<ClienteDashboard />} />
            <Route path="OT" element={<PageOT />} />
            <Route path="Formulario" element={<FormularioOT />} />
          </Route>
          <Route path="*" element={<><h1>Error 404</h1><strong>Esta Pagina no existe</strong></>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}