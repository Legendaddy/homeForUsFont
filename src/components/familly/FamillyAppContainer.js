/* General Library */
import React, {useState} from 'react'

/* Redux Library */
import { useSelector, useDispatch } from 'react-redux';

/* Redux personal Library */
import {famillyNew } from '../../redux/Familly/actionFamilly';

/* React exernal component */
import ReactModal from 'react-modal'

/* Personnal Component */
import MainMenu from '../MainMenu'
import FamillyDisplay from './FamillyDisplay';

/* Style import */
import '../../styles/Profil/style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

ReactModal.setAppElement("#root");

function FamillyAppContainer() {
    //#region variable used for display data inside DOM
    const [showModal, setShowModal] = useState(false);
    const [famillyInput, setFamillyInput] = useState('');
    //#endregion
    
    //#region variable linked to the redux store
    const famillies = useSelector(state => state.familly.famillies);

    const dispatch = useDispatch()

    //#endregion    

    //#region
    const handleOpenModal = () => {
        setFamillyInput('');
        setShowModal(true);
      };
    

    const handleValidModal = () => {  
        dispatch(famillyNew(famillyInput));
        setShowModal(false);
    };

    
    const handleCloseModal = () => {
        setShowModal(false);
      };
    //#endregion

    return (
        <>
            <div id = "bg-image" className = "user-image">
            </div>
            <MainMenu/>
            
            <section id="profil" className="d-flex align-items-center vh-100 vw-100" >
                <div className="container-fluid d-flex justify-content-center" style={{minHeight:"300px"}}>
                    <div className="col-7 justify-content-md-center mx-3 p-5">
                        <div className="d-flex justify-content-between  align-middle px-4">
                            <h2 className="text-dark text-capitalize"> Familles </h2>
                            <div className="btn my-auto border border p-2" onClick={handleOpenModal}>    
                                <FontAwesomeIcon icon={faPlus} color ="#FFF" size="2x"></FontAwesomeIcon>
                            </div>
                        </div>
                        {famillies.map(familly =>{
                             return(<FamillyDisplay familly={familly}/>)
                            }
                        )}
                    </div>
                </div>
            </section>
            <ReactModal 
                isOpen={showModal}
                contentLabel="Familly add interface"
                className="Modal"
                overlayClassName="Overlay"
            >   
                <div className="h3"> Créer une nouvelle Famille</div>
                <label for="famillyName">Nom de la Famille:</label>
                <input id="famillyName" type="text" value={famillyInput} onChange={(e) => {setFamillyInput(e.target.value)}}/>
                <div className="d-flex justify-content-end">
                    <input id="famillySubmit" className="btn btn-success m-2" style={{width:"100px"}} type="button" value="Valider" onClick={handleValidModal}/>
                    <input id="famillySubmit" className="btn btn-warning m-2" style={{width:"100px"}} type="button" value="Fermer" onClick={handleCloseModal}/>
                </div>
            </ReactModal>
        </>
    )
}

export default FamillyAppContainer
