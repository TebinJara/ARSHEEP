import React from "react";
import "./Layout.css";
import { LayoutHeader } from "../comp-layout/LayoutHeader";
import { LayoutFooter } from "../comp-layout/LayoutFooter";
import { RouterPrincipal } from "../routers/RouterPrincipal";


export const Layout = () => {
  return (
    <div className="layout-1">
      <div className="header"><LayoutHeader/></div>
      <div className="content"><RouterPrincipal/></div>
      <div className="footer"><LayoutFooter/></div>
    </div>
  );
};
