import React, {useState} from 'react'
import MainMenu from '../MainMenu'
import DatePicker from "react-datepicker";

import { useSelector, useDispatch } from 'react-redux';
import { userUpdateProfil, userUpdatePwd } from '../../redux/Auth/actionAuth';

import "react-datepicker/dist/react-datepicker.css" 
import "../../styles/Profil/style.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { messageError } from '../../redux/Message/actionMessage';


function ProfilContainer() {
	const data = useSelector(state => state.auth)

    const dispatch = useDispatch()

	const [firstName, setFirstName] = useState(data.firstname)
	const [lastName, setLastName] = useState(data.lastname)
	const [email, setEmail] = useState(data.email)
	const [birth, setBirth] = useState(Date.parse(data.birth))


	const [pwdActual, setPwdActual] = useState('')
	const [pwdOne, setPwdOne] = useState('')
	const [pwdTwo, setPwdTwo] = useState('')


    const handlerUpdateProfil = (e) => {
        e.preventDefault();
        let dateString = '';
        let dateValue = birth;

        if(dateValue !== null){
            if( typeof dateValue == "number" ){
                dateValue= new Date(birth)
            }
            if( typeof dateValue == "object" ){
                try {
                    let dd = String(dateValue.getDate()).padStart(2, '0');
                    let mm = String(dateValue.getMonth() + 1).padStart(2, '0'); //January is 0!
                    let yyyy = dateValue.getFullYear();

                    dateString = yyyy + "-" + mm + "-" + dd;

                } catch (err) {
                    dispatch(messageError(err))
                };
        };
        dispatch(userUpdateProfil(firstName, lastName, email, dateString))
    };
    };
    
    const handlerUpdatePwd = (e) => {
        e.preventDefault();
        dispatch(userUpdatePwd(pwdActual, pwdOne, pwdTwo));
    };

    return (
        <>
            <div id = "bg-image" className = "user-image">
            </div>
            <MainMenu/>
            <section id="profil" className="d-flex align-items-center vh-100 vw-100" >
                <div className="container-fluid d-flex justify-content-center" style={{minHeight:"300px"}}>
                    <div className="col-7 card border border-3 border-info border-radius rounded-3 shadow justify-content-md-center mx-3 p-5 bg-transparant"> 
                        <h2 className="text-primary text-capitalize mb-4">{data.username}</h2>
                        <form>
                        <table className="w-100">
                            <tbody>
                                <tr>
                                    <th scope="row" className="col-3 text-info">Nom</th>
                                    <td className="col-8"><input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} style={{width:"100%"}}/></td>
                                </tr>
                                <tr>
                                    <th scope="row" className="col-3 text-info">Prénom</th>
                                    <td className="col-8"><input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} style={{width:"100%"}}/></td>
                                </tr>
                                <tr>
                                    <th scope="row" className="col-3 text-info">Date Naissance</th>
                                    <td className="col-8" ><DatePicker dateFormat="yyyy-MM-dd" selected={birth} onChange={(date) => setBirth(date)} wrapperClassName="datePicker"/></td>
                                </tr>
                                <tr>
                                    <th scope="row" className="col-3 text-info">E-mail</th>
                                    <td className="col-8"><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{width:"100%"}}/></td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="text-right"><input className="btn btn-info mt-3" style={{width:"200px"}} type="button" value="submit" onClick={(e) => handlerUpdateProfil(e)}></input></div>
                        </form>
                        <hr className="mt-5"/>
                        <h4 className="text-primary mb-4">Password Modification</h4>
                        <form>
                            <table className="w-100">
                                <tbody>
                                    <tr>
                                        <th scope="row" className="col-3 text-info">Courant</th>
                                        <td className="col-8"><input type="password" value={pwdActual} onChange={e => setPwdActual(e.target.value)}/></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="col-3 text-info">New </th>
                                        <td className="col-8"><input type="password" value={pwdOne} onChange={e => setPwdOne(e.target.value)}/></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="col-3 text-info">Confirm</th>
                                        <td className="col-8"><input type="password" value={pwdTwo} onChange={e => setPwdTwo(e.target.value)}/></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="text-right"><input className="btn btn-info mt-3 " style={{width:"200px"}} type="button" value="submit" onClick={(e) => handlerUpdatePwd(e)}></input></div>
                        </form>
                    </div>
                    <div className="col-4 card border border-3 border-info border-radius rounded-3 shadow justify-content-md-center mx-3 p-5 bg-transparant">
                        <div className="text-center mx-auto p-3 text-primary" style={{borderStyle:"dashed", borderRadius:"5px"}}>
                        <FontAwesomeIcon icon={faUserAlt} color="#41CFD9" size="10x"/>    
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default ProfilContainer
