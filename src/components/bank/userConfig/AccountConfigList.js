/* React library */
import React, {useEffect, useState} from 'react';

/* Redux library */
import {useSelector} from 'react-redux';

/* React exernal component */
import {v4 as uuid} from 'uuid';

/* React personnal component */
import OffsetAccount from './Modal/OffsetAccount';
import UpdateAccount from './Modal/UpdateAccount';
import DeactiveAccount from './Modal/DeactiveAccount';

/* Font library */
import { faPowerOff, faSlidersH, faStar, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function AccountConfigList({account}) {
    //#region REDUX DATA
    const user = useSelector(state=> state.auth.username)
    
    //#region DISPLAY VARIABLE
    const [colorBtn, setColorBtn] = useState("#FFF");
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModalDeactivate, setShowModalDeactivate] = useState(false);
    const [showModlaOffset, setShowModalOffset] = useState(false);

    //#endregion
   
    //#region DOM DISPLAY
    useEffect(() => {
        switch(account.activated){
            case "O":
                setColorBtn("#0BE041");
                break;
            case "D":
                setColorBtn("#E0B316");
                break;
            case "R":
                setColorBtn("#E03E00");
                break;
            default: 
                setColorBtn("#333");
        }
    }, [account.activated]);

    //#endregion

    return (
        <>
        <div className="card border border-radius rounded-3 shadow m-2 w-100">
            <div className="card-body">
                <h4 className="card-title">Compte : {account.description}</h4>
                <hr/>
                <div className="d-flex justify-content-around align-items-center">
                <div className="col-1 btn" >
                    <FontAwesomeIcon icon={faPowerOff} color={colorBtn} className="mx-1"/>
                    </div>
                <div className="col-2">
                        <span className="text-uppercase">Banque: </span>{account.bank}
                    </div>
                    <div className="col-2">
                        {(account.user === user)?<FontAwesomeIcon icon={faStar} color="#E6CF32" className="mr-1" />: null} 
                        <span className="text-uppercase">Proprietaire: </span> {account.user}
                    </div>
                    <div className="col-2">
                        <span className="text-uppercase"> Famille: </span>{account.familly}
                    </div>
                    <div className="col-2">
                        <span className="text-uppercase">Numéro de compte: </span>{account.number}
                    </div>
                    <div className="col-3">
                        <span className="text-uppercase">Action:</span>
                        <button className="btn btn-info ml-2" onClick={e=>setShowModalOffset(true)} > Set offset </button>
                        <div className="btn my-1" onClick={e=>setShowModalUpdate(true)} ><FontAwesomeIcon icon={faSlidersH} color="#E0B316" className="mx-1"/></div>
                        <div className="btn my-1" onClick={e=>setShowModalDeactivate(true)}><FontAwesomeIcon icon={faTrash} color="#F00" className="mx-1"/></div>
                    </div>
                </div>
            </div>
        </div>
        <OffsetAccount account={account} showModal={showModlaOffset} setShowModal={setShowModalOffset} key={uuid()}/>
        <UpdateAccount account={account} showModal={showModalUpdate} setShowModal={setShowModalUpdate} key={uuid()}/>
        <DeactiveAccount account={account} showModal={showModalDeactivate} setShowModal={setShowModalDeactivate} key={uuid()}/>
        </>
    );
};

export default AccountConfigList
