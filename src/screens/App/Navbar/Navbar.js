import {Link, useLocation} from "react-router-dom";
import React from "react";

function Navbar() {
    const location = useLocation();
    if(location.pathname === '/login'){
        return null;
    }

    return (
        <div className="App" style={{background:'red'}}>
            {location.key}
            <div style={{height: '150px'}} className={'d-flex justify-content-around'}>
                <Link to="/">Home</Link>
                <Link to="/account">account</Link>
            </div>
        </div>
    );
}

export default Navbar;
