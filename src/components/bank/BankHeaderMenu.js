/* React Import */
import React from 'react'
import { NavLink } from 'react-router-dom'

/* Style Part */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function BankHeaderMenu() {
    return (
        <nav id="headerNav" className="navbar navbar-dark bg-dark">
            <div className="d-flex justify-content-begin align-middle align-items-center">
                <NavLink to="/bank" className="h2 text-light mx-2">Compte Bancaire</NavLink>
                <NavLink to="/bank/account" className=" btn mx-2">
                    <FontAwesomeIcon icon={['fas','landmark']} size="2x" color="white"></FontAwesomeIcon>
                </NavLink>
                <NavLink to="/bank/budget" className=" btn mx-2">
                    <FontAwesomeIcon icon={['fas','book']} size="2x" color="white"></FontAwesomeIcon>
                </NavLink>
                <NavLink to="/bank/input" className=" btn mx-2">
                    <FontAwesomeIcon icon={['fas','cash-register']} size="2x" color="white"></FontAwesomeIcon>
                </NavLink>
                <NavLink to="/bank/import" className=" btn mx-2">
                    <FontAwesomeIcon icon={['fas','file-import']} size="2x" color="white"></FontAwesomeIcon>
                </NavLink>
            </div>
        </nav>
    );
};

export default BankHeaderMenu;
