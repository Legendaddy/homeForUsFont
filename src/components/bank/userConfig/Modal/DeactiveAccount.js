/* library REACT */
import React, { useState, useEffect } from 'react';

/* externe component React */
import ReactModal from 'react-modal';
import Select from 'react-select';

/* Library Redux */
import { useDispatch} from 'react-redux'
import { accountActivationUpdate } from '../../../../redux/Bank/actionBank';

ReactModal.setAppElement("#root");

function DeactiveAccount({account, showModal, setShowModal}) {  
   
    const [status, setStatus] = useState({});
    
    const dispatch = useDispatch(accountActivationUpdate)

    const listStatus = [
        {label: "OUI", value: "O"},
        {label: "DEACTIVATED", value: "D"},
        {label: "REMOVED", value: "R"}
    ];

    useEffect(() => {
        switch(account.activated){
            case "O":
                setStatus({label: "OUI", value: "O"});  
                break;
            case "D":
                setStatus({label: "DEACTIVATED", value: "D"});
                break;
            case "R":
                setStatus({label: "REMOVED", value: "R"});
                break;
            default:
                break;
        }
    }, [])

    const handleValidModal = () => {
        const famillyName = account.familly === null ? '' : account.familly
        if(account.activated !== status["value"]){

            dispatch(accountActivationUpdate(account.number, famillyName, account.user, status["value"] ))
        }
        setShowModal(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <ReactModal 
                isOpen={showModal}
                contentLabel="Account update interface"
                className="Modal"
                overlayClassName="Overlay"
            >   
                <div className="h4">Modification du statut du compte {account.number}</div>
                <div className="d-flex align-items-center">
                    <label className="col-4"    forHtml="StatutAccount"> Choix du statut</label> 
                    <Select id="StatutAccount" className="form-select form-select-sm ml-2 w-100" 
                                isSearchable={true} isClearable={false}
                                options={listStatus} onChange={e=>setStatus(e)}
                                value = {status}
                                ></Select>
                </div>
                <div className="font-italic my-4" style={{fontSize:"0.8rem"}}> 
                    <p> Un compte desactivé n'est plus pris en compte dans les calculs mais l'historique est accéssible</p>
                    <p> Un compte supprimé n'est plus accéssible et le sera définitivement après un mois</p>
                </div>

                <div className="d-flex justify-content-end">
                    <input id="famillySubmit" className="btn btn-success m-2" style={{width:"100px"}} type="button" value="Valider" onClick={handleValidModal}/>
                    <input id="famillySubmit" className="btn btn-danger m-2" style={{width:"100px"}} type="button" value="Fermer" onClick={handleCloseModal}/>
                </div>
            </ReactModal>
    )
};

export default DeactiveAccount;
