import React from 'react'
import { NavLink } from 'react-router-dom'
import MainMenu from './MainMenu'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUsers, faMoneyCheck, faHotdog } from '@fortawesome/free-solid-svg-icons'

function MainSelector() {
    return (
        <>
            <div id = "bg-image" className = "user-image">
            </div> 
            <MainMenu/>
            <div className="container_select">
                <NavLink to="/profil" className="col-2 shadow border border-secondary mx-1 rounded p-5 text-center text-light" style={{backgroundColor:"rgba(0, 0, 0, 0.500)", minHeight:"300px"}}>
                    <FontAwesomeIcon icon={faUser}  size="7x"/> 
                    <h3 className="mt-3">Profil</h3>
                 </NavLink>
                <NavLink to="/familly" className="col-2 shadow border border-secondary mx-1 rounded p-5 text-center text-light" style={{backgroundColor:"rgba(0, 0, 0, 0.500)", minHeight:"300px"}} > 
                    <FontAwesomeIcon icon={faUsers} size="7x"/> 
                    <h3 className="mt-3">Familles</h3>
                </NavLink>
                <NavLink to="/bank" className="col-2 shadow border border-secondary mx-1 rounded p-5 text-center text-light" style={{backgroundColor:"rgba(0, 0, 0, 0.500)", minHeight:"300px"}}> 
                    <FontAwesomeIcon icon={faMoneyCheck} size="7x"/>
                    <h3 className="mt-3">Compte bancaire</h3>
                </NavLink>
                <NavLink to="/diner" className="col-2 shadow border border-secondary mx-1 rounded p-5  text-center text-light" style={{backgroundColor:"rgba(0, 0, 0, 0.500)", minHeight:"300px"}}> 
                    <FontAwesomeIcon icon={faHotdog} size="7x"/>
                    <h3 className="mt-3">Menu</h3>
                </NavLink>
            </div>
        </>
    )
}

export default MainSelector
