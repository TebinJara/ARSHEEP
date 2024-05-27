import React, { useState } from 'react';
import "./MenuNav.css";
import { NavLink } from 'react-router-dom';

export const MenuNav = () => {
    const [menuSelected, setMenuSelected] = useState(null);

    const handleNavLinkClick = (url) => {
        // Toggle the submenu: hide if already shown, show otherwise
        if (menuSelected === url) {
            setMenuSelected(null);
        } else {
            setMenuSelected(url);
        }
    }

    return (
        <div className='menu-nav'>
            <nav>
                <ul>
                    <li>
                        <NavLink
                            className={({ isActive }) => isActive ? "navlink-activo" : "navlink"}
                            to="/Layout/Clientes"
                            onClick={() => handleNavLinkClick("/Layout/Clientes")}
                        >
                            Clientes
                        </NavLink>
                        <div className={`sub-menu-nav ${menuSelected === "/Layout/Clientes" ? "visible" : ""}`}>
                            <ul>
                                <li>
                                    <NavLink
                                        className={({ isActive }) => isActive ? "navlink-activo" : "navlink"}
                                        to="/Layout/Clientes/Listado"
                                        onClick={() => handleNavLinkClick("/Layout/Clientes/Listado")}
                                    >
                                        Listado Clientes
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className={({ isActive }) => isActive ? "navlink-activo" : "navlink"}
                                        to="/Layout/Clientes/Listado"
                                        onClick={() => handleNavLinkClick("/Layout/Clientes/Listado")}
                                    >
                                        Listado Clientes
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className={({ isActive }) => isActive ? "navlink-activo" : "navlink"}
                                        to="/Layout/Clientes/Listado"
                                        onClick={() => handleNavLinkClick("/Layout/Clientes/Listado")}
                                    >
                                        Listado Clientes
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) => isActive ? "navlink-activo" : "navlink"}
                            to="/Layout/OT"
                            onClick={() => handleNavLinkClick("/Layout/OT")}
                        >
                            Ordenes de Trabajo
                        </NavLink>
                     

                    </li>
                    <li>
                            <NavLink
                                className={({ isActive }) => isActive ? "navlink-activo" : "navlink"}
                                to="/Layout/Formulario"
                                onClick={() => handleNavLinkClick("/Layout/Formulario")}
                            >
                                Formulario O.T.
                            </NavLink>
                        </li>
                </ul>
            </nav>
        </div>
    )
}