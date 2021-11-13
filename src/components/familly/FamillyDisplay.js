/* import React */
import React, {useState } from 'react'

/* Import redux */
import { useDispatch } from 'react-redux';

/* Redux personal Library */
import { famillyAddUser, famillyDelete, famillyRemoveUser } from '../../redux/Familly/actionFamilly';

/* React exernal component */
import ReactModal from 'react-modal'

/* Personnal Component */

/* import style */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons'

function FamillyDisplay({familly}) {
    //#region display variable
    const [showModalUser, setShowModalUser] = useState(false);
    const [showModalFamilly, setShowModalFamilly] = useState(false);
    const [userNameInput, setUserNameInput] = useState('');
    //#endregion

    //#region Redux variable
    const dispatch = useDispatch()
    //#endregion

    //#region METHOD
    const removeUser = (userName) => {
        dispatch(famillyRemoveUser(familly.familly, userName))
    };
    //#endregion

    //#region modal method for new User
    const handleOpenModalUser = () => {
        setUserNameInput('');
        setShowModalUser(true);
    };
    
    const handleValidModalUser = () => {  
        dispatch(famillyAddUser(familly.familly, userNameInput))
        setShowModalUser(false);
    };
    
    const handleCloseModalUser = () => {
        setShowModalUser(false);
    };
    //#endregion

    //#region modal method for confirm delete Familly
    const handleOpenModalFamilly = () => {
        setShowModalFamilly(true);
    };

    const handleValidModalFamilly = () => {  
        dispatch(famillyDelete(familly.familly))
        setShowModalFamilly(false);
    };
    
    const handleCloseModalFamilly = () => {
        setShowModalFamilly(false);
    };
    //#endregion


    return (
        <>
        <div className="card border-3 border-black border-radius rounded-3 shadow my-2 p-2">
            <div className="d-flex justify-content-between align-middle shadow px-4">
                <h3 className="text-secondary">{familly.familly}</h3>
                <div>
                    <div className="btn my-auto p-2" onClick={handleOpenModalUser}>
                    <FontAwesomeIcon icon={faUserPlus} color="#004457" size="1x"/>
                    </div>
                    <div className="btn my-auto p-2" onClick={handleOpenModalFamilly}>
                        <FontAwesomeIcon icon={faTrash} color ="#F00" size="1x"></FontAwesomeIcon>
                    </div>
                </div>

            </div>
            <table className="text-dark">
                <thead>
                    <tr>
                        <th scope="col">User Name</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Prenom</th>
                        <th scope="col">@Email</th>
                        <th scope="col">Date Anniversaire</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {familly.user.map(usr => {
                        return (
                        <tr>
                            <th scope="row">{usr.username}</th>
                            <td>{usr.last_name}</td>
                            <td>{usr.first_name}</td>
                            <td>{usr.email}</td>
                            <td>{usr.date_of_birth}</td>
                            <td className="d-flex justify-content-around"> 
                                
                                <FontAwesomeIcon icon={faTrash} color="#F00" size="1x" onClick={()=> removeUser(usr.username)}/>
                            </td>
                        </tr>)  
                    })}
                </tbody>
            </table>
        </div>
        <ReactModal 
                isOpen={showModalUser}
                contentLabel="User add interface"
                className="Modal"
                overlayClassName="Overlay"
            >   
                <div className="h3"> Créer un nouvelle User dans la Famille {familly.familly}</div>
                <label for="famillyName">Nom ou email de l'utilisateur:</label>
                <input id="famillyName" type="text" value={userNameInput} onChange={(e) => {setUserNameInput(e.target.value)}}/>
                <div className="d-flex justify-content-end">
                    <input id="famillySubmit" className="btn btn-success m-2" style={{width:"100px"}} type="button" value="Valider" onClick={handleValidModalUser}/>
                    <input id="famillySubmit" className="btn btn-warning m-2" style={{width:"100px"}} type="button" value="Fermer" onClick={handleCloseModalUser}/>
                </div>

            </ReactModal>
            <ReactModal 
                isOpen={showModalFamilly}
                contentLabel="Familly Remove interface"
                className="Modal"
                overlayClassName="Overlay"
            >   
                <div className="h3"> Voulez-vous supprimer la Famille {familly.familly} ? </div>
                <div className="d-flex justify-content-end">
                    <input id="famillySubmit" className="btn btn-success m-2" style={{width:"100px"}} type="button" value="Valider" onClick={handleValidModalFamilly}/>
                    <input id="famillySubmit" className="btn btn-warning m-2" style={{width:"100px"}} type="button" value="Fermer" onClick={handleCloseModalFamilly}/>
                </div>
            </ReactModal>
        </>
    );
};

export default FamillyDisplay;
