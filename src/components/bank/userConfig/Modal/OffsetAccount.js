/* library REACT */
import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

/* externe component React */
import ReactModal from 'react-modal';

/* Library Redux */
import { useDispatch} from 'react-redux';

/* personnal Redux Library */
import {accountOffsetAdd} from '../../../../redux/Bank/actionBank'

/* Font library */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


ReactModal.setAppElement("#root");

function OffsetAccount({account, showModal, setShowModal}) {
    //#region DOM Variable
    const [dateOffset, setDateOffset] = useState(Date.now().toString())
    const [amount, setAmount] = useState(0)

    //#endregion

    const dispatch = useDispatch();

    //récupérer les données d'ovset
    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleAddOffset = (e) => {
        e.preventDefault();
        const date_offset = new Date(dateOffset)
        dispatch(accountOffsetAdd(account.number, account.user, date_offset, parseFloat(amount)));
    }

    return (
        <ReactModal 
                isOpen={showModal}
                contentLabel="Account offset update interface"
                className="Modal w-75"
                overlayClassName="Overlay"
            >   
                <div className="h4">Liste et Modification de l'offset du compte {account.number}</div>
                
                <div>
                    <table className="table">
                        <thead  >
                            <tr>
                                <th className="border-0" scope="col">Date</th>
                                <th className="border-0" scope="col">Montant</th>
                                <th className="border-0" scope="col">Actif</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr> 
                                <td><input id="date-offset" type="date" className="form-control ml-2" 
                                value={dateOffset} onChange={e=>setDateOffset(e.target.value)}></input></td>

                                <td><input id="amount-offset" type="number" className="form-control ml-2"
                                value={amount} onChange={e=>setAmount(e.target.value)}></input></td>

                                <td><button id="valid-offset" className="btn btn-primary shadow" onClick={e => handleAddOffset(e)}> ADD </button></td>   
                            </tr>
                            {
                                account.offset.map(item => {
                                    return (
                                        <tr key={uuid()}>
                                            <td>{item.date_offset}</td>
                                            <td>{item.amount} € </td>
                                            <td>{item.activated?<FontAwesomeIcon icon={['fas','check']}  color="var(--primary)"/>:<FontAwesomeIcon icon={['fas','times']}  color="var(--danger)"/>}</td>
                                        </tr>
                                    )
                                })
                            }                 
                        </tbody>
                    </table>
                </div>

                <div className="d-flex justify-content-end">
                    <input id="famillySubmit" className="btn btn-danger m-2" style={{width:"100px"}} type="button" value="Fermer" onClick={handleCloseModal}/>
                </div>
            </ReactModal>
    )
};

export default OffsetAccount;
