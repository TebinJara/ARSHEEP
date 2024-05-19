import React from "react";
import "./Layout.css";
import { LayoutHeader } from "../Layout/comp-layout/LayoutHeader";
import { LayoutFooter } from "../Layout/comp-layout/LayoutFooter";
import { RouterPrincipal } from "../routers/RouterPrincipal";
import { ArsheepRouter } from "../routers/ArsheepRouter";
import { MenuNav } from "../Layout/comp-layout/MenuNav";
import { PageCliente } from "../pages/PageCliente";


export const Layout = () => {
  return (
    <div className="layout-1">
      <div className="header"><LayoutHeader/></div>
      <div className="menuNav"><MenuNav/></div>
      <div className="content"><PageCliente/></div>
      <div className="footer"><LayoutFooter/></div>
    </div>
  );
};
