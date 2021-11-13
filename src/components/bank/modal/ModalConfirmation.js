/* library REACT */
import React from 'react';

/* import Redux */
import { useDispatch } from 'react-redux'

/* externe component React */
import ReactModal from 'react-modal';
import { monthBudgetDelete, operationDelete, standardDelete } from '../../../redux/Bank/actionBank';


function ModalConfirmation({data, text, showModal, setShowModal, month, year, who}) {
    //#region 
    const dispatch = useDispatch();
    //#endregion


    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleValidModal = (e) => {
        if (who === "standard"){
            dispatch(standardDelete(data.id, data.account.number, data.account.user));
        }
        else if(who ==="monthly") {
            dispatch(monthBudgetDelete(data.id, data.account.number, data.account.user, month, year));
        }
        else if (who === "operation"){
            dispatch(operationDelete(data.id))
        }
        setShowModal(false);
    }

    return (
            <ReactModal 
                isOpen={showModal}
                contentLabel="Account offset update interface"
                className="Modal w-25"
                overlayClassName="Overlay"
                >

                <div className="h4 text-capitalize">êtes vous sur de vouloir supprimer? </div>
                <div> <span className="text-capitalize"> "{who!=='operation'?data.comments : data.description}"</span> d'un montant de <span className="font-weight-bold"> {data.amount} €</span></div>

                <div> </div>
                <div className="d-flex justify-content-arround">
                    <input id="famillySubmit" className="btn btn-success m-2" style={{width:"100px"}} type="button" value="OUI" onClick={handleValidModal}/>
                    <input id="famillySubmit" className="btn btn-danger m-2" style={{width:"100px"}} type="button" value="NON" onClick={handleCloseModal}/>
                </div>
                
            </ReactModal>
    )
}

export default ModalConfirmation
