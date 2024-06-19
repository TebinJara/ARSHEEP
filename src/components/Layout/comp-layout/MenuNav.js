import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { UserInfo } from '../../login/UserInfo';

export const MenuNav = () => {
    const [menuSelected, setMenuSelected] = useState(null);
    const location = useLocation();

    const handleNavLinkClick = (url) => {

        console.log('Navigating to:', url);
        if (menuSelected === url) {
            setMenuSelected(null); // Colapsar el submenú si el navlink ya está activo
        } else {
            setMenuSelected(url);
        }
    }

    const handleSubMenuLinkClick = (url) => {
        console.log('Navigating to submenu:', url);
        // No cambia el estado de menuSelected
    }

    return (
        <div className='menu-nav'>
            <div>
                <UserInfo />
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink
                            className={({ isActive }) => isActive || menuSelected === "/Layout/Clientes" ? "navlink-activo" : "navlink"}
                            to="/Layout/Clientes"
                            onClick={() => handleNavLinkClick("/Layout/Clientes")}
                        >
                            Clientes
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) => isActive || menuSelected === "/Layout/VT" ? "navlink-activo" : "navlink"}
                            to="/Layout/VT"
                            onClick={() => handleNavLinkClick("/Layout/vt")}
                        >
                            Visita Técnica
                        </NavLink>
                        <div className={`sub-menu-nav ${menuSelected === "/Layout/vt" ? "visible" : ""}`}>
                            <ul>
                                <li>
                                    <NavLink
                                        className={({ isActive }) => isActive ? "navlink-activo" : "navlink"}
                                        to="/Layout/VT/crear-vt"
                                        onClick={() => handleSubMenuLinkClick("/Layout/VT/crear-vt")}
                                    >
                                        Ingresar V.T.
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) => isActive || menuSelected === "/Layout/OT" ? "navlink-activo" : "navlink"}
                            to="/Layout/OT"
                            onClick={() => handleNavLinkClick("/Layout/OT")}
                        >
                            Ordenes de Trabajo
                        </NavLink>
                        <div className={`sub-menu-nav ${menuSelected === "/Layout/OT" ? "visible" : ""}`}>
                            <ul>
                                <li>
                                    <NavLink
                                        className={({ isActive }) => isActive ? "navlink-activo" : "navlink"}
                                        to="/Layout/Calendario"
                                        onClick={() => handleSubMenuLinkClick("/Layout/Calendario")}
                                    >
                                        Calendario
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) => isActive || menuSelected === "/Layout/Formulario" ? "navlink-activo" : "navlink"}
                            to="/Layout/Formulario"
                            onClick={() => handleNavLinkClick("/Layout/Formulario")}
                        >
                            Formulario O.T.
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) => isActive || menuSelected === "/Layout/gestiones" ? "navlink-activo" : "navlink"}
                            to="/Layout/gestiones"
                            onClick={() => handleNavLinkClick("/Layout/gestiones")}
                        >
                            Gestiones
                        </NavLink>
                        <div className={`sub-menu-nav ${menuSelected === "/Layout/gestiones" ? "visible" : ""}`}>
                            <ul>
                                <li>
                                    <NavLink
                                        className={({ isActive }) => isActive ? "navlink-activo" : "navlink"}
                                        to="/Layout/gestiones/usuarios"
                                        onClick={() => handleSubMenuLinkClick("/Layout/gestiones/usuarios")}
                                    >
                                        Usuarios
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className={({ isActive }) => isActive ? "navlink-activo" : "navlink"}
                                        to="/Layout/gestiones/usuarios"
                                        onClick={() => handleSubMenuLinkClick("/Layout/gestiones/usuarios")}
                                    >
                                        Repuestos
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
