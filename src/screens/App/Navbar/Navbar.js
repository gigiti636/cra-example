import {useLocation, NavLink} from "react-router-dom";
import React from "react";
import {NavigationWrapper} from "./atom"

function Navbar() {
    const location = useLocation();
    if(location.pathname === '/login'){
        return null;
    }

    let activeStyle = {
        borderBottom: "2px solid black",
    };

    return (
        <NavigationWrapper className="d-flex justify-content-around align-items-center">
            <NavLink to="/" className={'text-dark text-decoration-none'} style={({ isActive }) => isActive ? activeStyle : undefined}>Home</NavLink>
            <NavLink to="/mock-categories" className={'text-dark text-decoration-none'} style={({ isActive }) => isActive ? activeStyle : undefined}>Mock-Api-Categories</NavLink>
            <NavLink to="/rick-and-morty-api" className={'text-dark text-decoration-none'} style={({ isActive }) => isActive ? activeStyle : undefined}>Test public Api</NavLink>
        </NavigationWrapper>
    );
}

export default Navbar;
