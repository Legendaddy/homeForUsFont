import React from 'react'
import { NavLink } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import { userLogout } from '../redux/Auth/actionAuth'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'


function MainMenu() {

    const dispatch =useDispatch()

    return (
        <div className="main_menu"> 
            <div><NavLink to="/" className="text-dark h4">MENU</NavLink></div>
            <div className="d-flex justify-content-around align-middle my-auto">
                <FontAwesomeIcon icon={faUser}  size="1x"/> 
                <div className="mx-4"><input className="btn btn-dark" id="logout" type="button" value="LOGOUT" onClick={()=> dispatch(userLogout()) }/></div>
            </div>
        </div>
    )
}

export default MainMenu
