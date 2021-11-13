import React, {useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock} from '@fortawesome/free-solid-svg-icons'

import '../../styles/Auth/style.css'
import { userLogin } from '../../redux/Auth/actionAuth'
import { Redirect } from 'react-router-dom';

function AuthLogin() {

    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')

    const data = useSelector(state => state.auth)

    const dispatch =useDispatch()

    if (data.isAuthenticated) {
        return <Redirect to="/" />
    }

    const handleAuthotenfication = (e) => {
        e.preventDefault();
        dispatch(userLogin(user, pwd));
    }

    return (
        <>
            <div id = "bg-image" className = "user-image">
            </div>
            <div className="user">
                <div className=" mx-auto mt-2 p-3" style= {{}}>
                    <FontAwesomeIcon icon={faLock} color="#41CFD9" size="3x"/>    
                </div>
                <form className="flex mt-3 m-auto" onSubmit={(e) => handleAuthotenfication(e)}>
                    <div className="row mx-auto justify-content-between  mt-3">
                        <span className="fs-6 fst-italic text-white" >User:</span>
                        <div className="flex">
                            <input type="text" className="shadow" value={user} onChange={(e) => setUser(e.target.value)}/>
                        </div>
                    </div>

                    <div className="row justify-content-between mx-auto  mt-3">
                        <span className="fs-6 fst-italic text-white" >Password:</span>
                        <div className="flex">
                            <input type="password" className="shadow" value={pwd} onChange={(e) => setPwd(e.target.value)}/>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between mx-auto mt-5">
                        <input className="btn btn-link mx-2 text-primary" id="forgotten" type="button" value="password?"/>

                        <NavLink className="btn btn-link mx-2 text-primary" id="new" to="/register"> New User </NavLink>
                        
                        <input className="btn btn-success rounded shadow mx-2" id="submit" type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        </>
    )
}


export default AuthLogin