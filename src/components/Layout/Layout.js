import React from "react";
import { LayoutHeader } from "../Layout/comp-layout/LayoutHeader";
import { MenuNav } from "../Layout/comp-layout/MenuNav";
import { Outlet } from "react-router-dom";


export const Layout = () => {
  return (
    <div className="layout">
      <div className="header"><LayoutHeader/></div>
      <div className="menuNav"><MenuNav/></div>
      <div className="content"><Outlet/></div>
    </div>
  );
};
