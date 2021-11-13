import React, {useState} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserEdit } from '@fortawesome/free-solid-svg-icons'

import { userRegister } from '../../redux/Auth/actionAuth' 
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

function AuthRegister() {

    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [pwdOne, setPwdOne] = useState('');
    const [pwdTwo, setPwdTwo] = useState('');

    const dispatch =useDispatch()

    const authenticated = useSelector(state => state.auth.isAuthenticated)

    const handlerSubmit = (e) => {
        e.preventDefault()
        dispatch(userRegister(user, email, pwdOne, pwdTwo))
    };

    /* */
    if (authenticated){
        return <Redirect to="/"/>
    };

    return (
        <>
        <div id = "bg-image" className = "user-image">
        </div>
        <div className="user">
            <div className=" mx-auto mt-2 p-3" style= {{}}>
                <FontAwesomeIcon icon={faUserEdit} color="#41CFD9" size="3x"/>    
            </div>
            <form className="flex mt-3 m-auto" onSubmit = {(e) => handlerSubmit(e)}>
                
                <div className="row mx-auto justify-content-between  mt-3">
                    <span className="fs-6 fst-italic text-white" >User:</span>
                    <div className="flex  mx-2">
                        <input type="text" className="shadow" value={user} onChange={(e) => {setUser(e.target.value)}} />
                    </div>
                </div>

                <div className="row mx-auto justify-content-between  mt-3">
                    <span className="fs-6 fst-italic text-white" >Email:</span>
                    <div className="flex  mx-2">
                        <input type="email" className="shadow" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                    </div>
                </div>


                <div className="row justify-content-between mx-auto  mt-3">
                    <span className="fs-6 fst-italic text-white" >Password:</span>
                    <div className="flex  mx-2">
                        <input type="password" className="shadow" value={pwdOne} onChange={(e) => {setPwdOne(e.target.value)}} />
                    </div>
                </div>

                <div className="row justify-content-between mx-auto  mt-3">
                    <span className="fs-6 fst-italic text-white" >Confirm:</span>
                    <div className=" flex mx-2">
                        <input type="password" className="shadow" value={pwdTwo} onChange={(e) => {setPwdTwo(e.target.value)}} />
                    </div>
                </div>

                <div className="d-flex justify-content-between mx-auto mt-5">
                    <input className="btn btn-success rounded shadow mx-2" id="submit" type="submit" value="Submit"  
                    
                    />
                </div>

            </form>
        </div>
    </>
    )
}

export default AuthRegister
