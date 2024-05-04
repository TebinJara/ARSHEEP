import React, { useState } from "react";
import { Routes, Route, NavLink, BrowserRouter } from "react-router-dom";
import { PageCliente } from "../pages/PageCliente";
import { InfoProfile } from "../comp-layout/InfoProfile";
import "./RouterPrincipal.css";

export const RouterPrincipal = () => {
  // Estado para controlar el menú lateral seleccionado
  const [selectedMenuLat, setSelectedMenuLat] = useState(null);

  // Definición de menús y submenús
  const subMenus = [
    {
      id: 1,
      path: '/clientes',
      subMenu: [
        { path: '/clientes/listado-de-clientes', label: 'Listado' },
        { path: '/clientes/fichas', label: 'Fichas' },
        { path: '/clientes/ordenes-de-trabajo', label: 'Ordenes de Trabajo' },
        { path: '/clientes/tickets', label: 'Tickets' },
      ]
    },
    {
      id: 2,
      path: '/ordenes-trabajo',
      subMenu: [
        { path: '/subMenu2-A', label: 'subMenu2-A' },
        { path: '/subMenu2-B', label: 'subMenu2-B' },
        { path: '/subMenu2-C', label: 'subMenu2-C' },
        { path: '/subMenu2-D', label: 'subMenu2-D' }
      ]
    },
    {
      id: 3,
      path: '/tickets',
      subMenu: [
        { path: '/config-A', label: 'Opción A' },
        { path: '/config-B', label: 'Opción B' },
        { path: '/config-C', label: 'Opción C' }
      ]
    },
    {
      id: 4,
      path: '/estadisticas',
      subMenu: [
        { path: '/contact-A', label: 'Clientes' },
        { path: '/contact-B', label: 'Ordenes de Tarabajo' },
        { path: '/contact-C', label: 'Tickets' }
      ],

    },
    {
      id: 5,
      path: '/configuracion',
      subMenu: [
        { path: '/contact-A', label: 'Perfil' },
      ],

    },
    {
      id: 6,
      path: '/login',
      subMenu: [
        { path: '/contact-A', label: 'Salir' },
      ],

    }
  ];

  const handleMenuClick = (id) => {
    if (selectedMenuLat === id) {
      setSelectedMenuLat(null); // Si ya está seleccionado, desactivarlo
    } else {
      setSelectedMenuLat(id); // Si no está seleccionado, activarlo
    }
  };
  return (
    <BrowserRouter>
      <div className="router-layout">

      <div className="lat-menu">
        <div className="logo-arsheep">
          <img src="../img/logo-arsheep.png" alt="Descripción" />
        </div>
        <InfoProfile />
        <ul>
          {subMenus.map(menu => (
            <React.Fragment key={menu.id}>
              <li className='li-menu-principal'>
                < NavLink to={menu.path} onClick={() => handleMenuClick(menu.id)}
                  className={selectedMenuLat === menu.id ? 'active' : ''}>
                  {menu.id === 1 ? "Clientes" :
                    menu.id === 2 ? "Ordenes de trabajo" :
                      menu.id === 3 ? "Tickets" :
                        menu.id === 4 ? "Estadisticas" :
                          menu.id === 5 ? "Configuración" :
                            "Salir"}
                </NavLink>
              </li>
              {selectedMenuLat === menu.id && (
                <ul className='ul-submenu'>
                  {menu.subMenu.map(item => (
                    <li className='li-submenu' key={item.path}>
                      <a className='a-submenu' href={item.path}>{item.label}</a>
                    </li>
                  ))}
                </ul>
              )}
            </React.Fragment>
          ))}
        </ul>


      </div>
      <div className="content-browser">
        <Routes>
          <Route path="/" element={<PageCliente />} />
          <Route path="/Clientes" element={<PageCliente />} />
          <Route path="*" element={(<><h1>Error 404</h1><strong>Esta Pagina no existe</strong></>)} />
        </Routes>

      </div>

      </div>

    </BrowserRouter>
  );
};
