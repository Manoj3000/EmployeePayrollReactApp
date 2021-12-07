import React from "react";
import { Link, useLocation } from "react-router-dom";

function NavBar({logout}) {
    const location = useLocation();

    return (
        <>

            <nav className="navbar navbar-expand-md bg-dark navbar-dark">
                <div className="container">
                    <a className="navbar-brand" href="#">Employee Payroll</a>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul className="navbar-nav text-center ml-auto">
                            {location.pathname !== "/" ?
                                <li className="nav-item">
                                    <Link className="nav-link" to="/"><i className="fa fa-list"></i> List</Link>
                                </li>
                                : ""}
                            {location.pathname !== "/add" && location.pathname.substr(1, 4) !== "edit" ?
                                <li className="nav-item">
                                    <Link className="nav-link" to="/add"><i className="fa fa-user-plus "></i> Add</Link>
                                </li>
                                : ""}
                            <li className="nav-item">
                                <Link className="nav-link" to="/" onClick={logout}><i className="fa fa-power-off "></i> Logout</Link>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>
        </>
    );
}

export default NavBar;