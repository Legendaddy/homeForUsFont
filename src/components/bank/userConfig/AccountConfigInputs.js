/* import React*/
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Collapse } from 'react-bootstrap';

import {useSelector, useDispatch} from 'react-redux'

/* import style */
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { accountCreation } from '../../../redux/Bank/actionBank';

function AccountConfigInputs() {
    //#region display variable
    const [openInput, setOpenInput] = useState(false);
    const [rotation, setRotation] = useState(90);

    const [bankList, setBankList] = useState({});
    const [famillyList,setFamillyList] = useState({});
    const [userlist, setUserList] = useState({});

    const [bankName, setBankName] = useState('');
    const [description, setDescription] = useState('');
    const [accountNumber, setAccountNumber] = useState(0);
    const [famillyName, setFamillyName] = useState(null);
    const [userName, setUserName] = useState(null)

    //#endregion

    //#region Redux data
    const bankData = useSelector(state => state.bank);
    const famillies = useSelector(state => state.familly.famillies)
    const dispatch = useDispatch();

    //#endregion

    //#region DOM evolution
    //construction

    //actions
    useEffect(() => {
        if(!openInput){
            setRotation(90);
        }else{
            setRotation(180);
        }
    }, [openInput])

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
        setUserList({});
    }, [famillies]);

    useEffect(() => {
        let data = [];
        for (let pas = 0; pas < famillies.length; pas++){
            if(famillyName === null || famillies[pas].familly === famillyName.value){
                for(let pas2 = 0; pas2 < famillies[pas].user.length; pas2++)
                {        
                    if (!data.includes(famillies[pas].user[pas2].username))
                    {
                        data.push({value: famillies[pas].user[pas2].username,
                            label: famillies[pas].user[pas2].username});
                    };
                };
            };
        };

        setUserList(data)
    }, [famillies, famillyName])

    //#endregion

    //#region DOM Action
    const handleValidUnique = () => {
        let information = {
            bankName: bankName,
            description: description,
            number: accountNumber,
            famillyName: famillyName,
            userName: userName
        }
        dispatch(accountCreation(bankName.value, description, accountNumber, famillyName.value, userName.value ));

        setOpenInput(false)
    };

    const handleValidandOther = () => {

    };

    //#endregion
    return (

        <div className="card border border-radius rounded-3 shadow m-2 w-100">
            <div className="card-body">
                <div className="card-title d-flex flex-row justify-content-between align-items-center ">
                    <h3>Créer un compte</h3>
                    <div className="btn p-2">
                    <FontAwesomeIcon icon={faCaretRight} size="2x" onClick={() => setOpenInput(!openInput)} aria-controls="example-collapse-text" aria-expanded={openInput} rotation={rotation}/>
                    </div>
                </div>
                <hr/>
                <Collapse in={openInput}>
                    <form>
                        <div className="input-group flex-nowrap my-2">
                            <span className="input-group-text" id="selection-banque">Description </span>
                            <Select id="selection-banque" className="form-select form-select-sm ml-2 w-100" 
                            isSearchable={true} isClearable={true}
                            options={bankList} onChange={(e)=> setBankName(e)}></Select>
                        </div>

                        <div className="input-group flex-nowrap my-2">
                            <span className="input-group-text" id="description-input">Description </span>
                            <input type="text" className="form-control ml-2" placeholder="..." aria-label="Description" aria-describedby="description-input" 
                            value={description} onChange={e=>setDescription(e.target.value)}
                            />
                        </div>

                        <div className="input-group flex-nowrap my-2">
                            <span className="input-group-text" id="description-input">Numéro compte </span>
                            <input type="number" className="form-control ml-2" placeholder="XXXX XXXX XXXX XXXX" aria-label="Description" aria-describedby="description-input"
                            value={accountNumber} onChange={e=>setAccountNumber(e.target.value)}
                            />
                        </div>   
  
                        <div className="input-group flex-nowrap my-2">
                            <span className="input-group-text" id="selection-familly">Famille </span>
                            <Select id="selection-familly" className="form-select form-select-sm ml-2 w-100" 
                            isSearchable={true} isClearable={true}
                            options={famillyList} onChange={e=>setFamillyName(e)}
                            ></Select>
                        </div>

                        <div className="input-group flex-nowrap my-2">
                            <span className="input-group-text" id="selection-user">Utilisateur </span>
                            <Select id="selection-user" className="form-select form-select-sm ml-2 w-100" 
                            isSearchable={true} isClearable={true}
                            options={userlist} onChange={e=>setUserName(e)}
                            ></Select>
                        </div> 

                        <div className="d-flex justify-content-end my-2">
                            <input id="validation" className="btn btn-success mx-2" type="button" value="Validation" onClick={handleValidUnique}/>
                            <input id="validation-other" className="btn btn-success mx-2" type="button" value="Valider et Saisir à nouveau" onClick={handleValidandOther}/>
                            <input id="annulation" className="btn btn-warning mx-2" type="button" value="Annulation" onClick={() => setOpenInput(!openInput)}/>
                        </div>

                    </form>
                </Collapse>


            </div>            
        </div>
    )
}

export default AccountConfigInputs;
