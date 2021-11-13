/* React library */
import React, {useEffect, useState} from 'react';

/* Redux library */
import {useSelector, useDispatch} from 'react-redux'

/* React exernal component */
import ReactModal from 'react-modal'
import Select from 'react-select'
import { accountGeneralUpdate } from '../../../../redux/Bank/actionBank';


ReactModal.setAppElement("#root");

function UpdateAccount({account, showModal, setShowModal}) {
    const bankData = useSelector(state => state.bank);
    const famillies = useSelector(state => state.familly.famillies)
    const dispatch = useDispatch();
    
    //#region LOCAL VARIABLE
    const [bankList, setBankList] = useState({});
    const [famillyList,setFamillyList] = useState({});

    const [bankName, setBankName] = useState(account.bank);
    const [description, setDescription] = useState(account.description);
    const [accountNumber, setAccountNumber] = useState(account.number);
    const [famillyName, setFamillyName] = useState(account.familly===null?'':account.familly);

    //#endregion

    //#region LOCAL METHOD
    //data
    useEffect(() => {
        let data = [];
        for (let pas = 0; pas < bankData.bank.length ; pas++){
            data.push({value: bankData.bank[pas].name, label: bankData.bank[pas].name});
        };
        setBankList(data);
    }, [bankData.bank]);

    useEffect(() => {
        let data = [];
        for (let pas = 0; pas < famillies.length; pas++){
            data.push({value: famillies[pas].familly, label: famillies[pas].familly});
        };
        setFamillyList(data);
    }, [famillies]);

    //#endregion
    
    //#region MODAL METHOD

    const handleValidModal = () => {
        const val = (famillyName.value === undefined ? '' : famillyName.value)
        dispatch(accountGeneralUpdate(bankName, description, accountNumber, val , account.user))
        setShowModal(false);
    };


    const handleCloseModal = () => {
        setShowModal(false);
    };

    //#endregion

    return (
        <ReactModal 
                isOpen={showModal}
                contentLabel="Account update interface"
                className="Modal"
                overlayClassName="Overlay"
            >   
                <div className="h3">Modification du Compte</div>
                <div className="d-flex flex-column">
                    {/*div className="d-flex my-2">
                        <label htmlFor="update-bank" className="col-4">Banque:</label>
                        <Select id="update-bank" className="form-select form-select-sm ml-2 w-100" 
                            isSearchable={true} isClearable={true}
                            options={bankList} onChange={(e)=> setBankName(e)}
                            value = {{ label: bankName, value: bankName }}
                        ></Select>
                    </div>
                    <div className="d-flex my-2">
                        <label className="col-4">N° de compte</label>
                        <input type="number" className="form-control ml-2" placeholder="..." aria-label="Description" aria-describedby="description-input" 
                            value={accountNumber} onChange={e=>setAccountNumber(e.target.value)}
                            />  

                    </div>   */}
                    <div className="d-flex my-2">
                        <label className="col-4">Description</label>
                        <input type="text" className="form-control ml-2" placeholder="..." aria-label="Description" aria-describedby="description-input" 
                            value={description} onChange={e=>setDescription(e.target.value)}
                            />  
                    </div>
                    <div className="d-flex my-2">
                        <label htmlFor="update-familly" className="col-4">Famille </label>
                        <Select id="upate-familly" className="form-select form-select-sm ml-2 w-100" 
                                isSearchable={true} isClearable={true}
                                options={famillyList} onChange={e=>setFamillyName(e)}
                                defaultValue = {{ label: famillyName, value: famillyName }}
                                ></Select>
                    </div>

                </div>
                <div className="d-flex justify-content-end">
                    <input id="famillySubmit" className="btn btn-success m-2" style={{width:"100px"}} type="button" value="Valider" onClick={handleValidModal}/>
                    <input id="famillySubmit" className="btn btn-danger m-2" style={{width:"100px"}} type="button" value="Fermer" onClick={handleCloseModal}/>
                </div>
            </ReactModal>
    )
}

export default UpdateAccount
