    /* library REACT */
import React from 'react';

/* import Redux */
import { useDispatch } from 'react-redux'

/* externe component React */
import ReactModal from 'react-modal';
import { monthGenerateBudget } from '../../../redux/Bank/actionBank';

function BudgetGeneratedMonth({accountNumber, accountUser, showModal, setShowModal, month, year}) {
    //#region 
    const dispatch = useDispatch();
    //#endregion

    const refMonth = {
        1: "Janvier",
        2: "Février",
        3: "Mars",
        4: "Avril",
        5: "Mai",
        6: "Juin",
        7: "Juillet",
        8: "Aout",
        9: "Septembre",
        10: "Octobre",
        11: "Novembre",
        12: "Décembre"
    }


    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleValid = (mode) => {
        dispatch(monthGenerateBudget(accountNumber, accountUser, mode, month, year));
        setShowModal(false);
    }

    return (
        <ReactModal 
            isOpen={showModal}
            contentLabel="Account Generation monthly data"
            className="Modal w-50"
            overlayClassName="Overlay"
            >

            <div className="h4 text-capitalize">Génération du budget du mois {refMonth[month]} - {year} pour le compte {accountNumber}</div>
        
            <div> </div>
            <div className="d-flex justify-content-arround">
                <input id="famillySubmit" className="btn btn-warning m-2" style={{width:"300px"}} type="button" value="Fermer" onClick={handleCloseModal}/>
                <input id="famillySubmit" className="btn btn-info m-2" style={{width:"300px"}} type="button" value="Conserver les données déjà saisie?" onClick={e => {handleValid("add")}}/>
                <input id="famillySubmit" className="btn btn-info m-2" style={{width:"300px"}} type="button" value="Supprimer et générer de nouveau?" onClick={e => {handleValid("new")}}/>
            </div>
            
        </ReactModal>
    )
};

export default BudgetGeneratedMonth;
