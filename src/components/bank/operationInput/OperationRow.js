/* import React*/
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { v4 as uuid } from 'uuid';

/* import Redux */
import { useSelector, useDispatch }  from 'react-redux';

/* external component */
import Select from 'react-select';

/* Redux import */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalConfirmation from '../modal/ModalConfirmation';
import { operationUpdate } from '../../../redux/Bank/actionBank';
function OperationRow({operation}) {
    //#region 
    const typeRef = useSelector(state=> state.bank.type);
    const spendingRef = useSelector(state => state.bank.spending);
    const accounts = useSelector(state => state.bank.accounts);
    const dispatch = useDispatch();

    //#endregion

    //#region  local storage 
    const [date, setDate] = useState(operation.date_operation.slice(0,10));
    const [amount, setAmount] = useState(operation.amount);
    const [description, setdescription] = useState(operation.description);
    const [typeSelected, setTypeSelected] = useState(typeRef.find(type => type.value === operation.type, 1));
    const [spendingSelected, setSpendingSelected] = useState(spendingRef.find(spending => spending.value === operation.spending, 1));
    const [accountList, setAccountList] = useState([]);

    //#endregion

    //#region 
    useLayoutEffect(() => {
        let datas = [];
        accounts.map(account => {
            datas.push({value: account.number, label: account.user.concat("-", account.number)});
        });
        setAccountList(datas);  
    }, [accounts]);

    const [account, setAccount] = useState({value: operation.account.number, label: operation.account.user});
    
    //#endregion
    
    //#region 
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const [modification, setModification ] = useState(true);

    //#endregion

    //#region 
    const handleValidation = (reference) => {
        dispatch(operationUpdate(operation.id, date, amount, description, typeSelected.value, spendingSelected.value, account.value, account.label.split('-')[0]))
        setModification(!modification);
    };

    //#endregion

    return (
        <>
            <tr>
                <td className="px-3">{modification ? operation.date_operation.slice(0,10) : 
                            <input id="update-date" className="form-control"  type="date" value={date} 
                            onChange={e=> setDate(e.target.value)} /> }</td>
                <td className="px-3">{modification ? operation.account.user.concat('-',operation.account.number)  : 
                            <Select d="selection-type" className="form-select form-select-sm w-100" 
                            isSearchable={false} isClearable={false}
                            value={account}
                            options={accountList} onChange={e => setAccount(e)}></Select>
                } </td>            
                <td className="px-3">{modification ? operation.amount + "€": <input id="update-day" className="form-control"  type="number" value={amount} 
                        onChange={e=> setAmount(e.target.value)} /> } </td>
                <td className="px-3">{modification ? operation.description : <input id="update-day" className="form-control"  type="text" value={description} 
                        onChange={e=> {e.preventDefault(); setdescription(e.target.value)}}     />}</td>
                <td className="px-3">{modification ? typeRef.find(type => type.value === operation.type, 1).label :
                        <Select d="selection-type" className="form-select form-select-sm w-100" 
                        isSearchable={false} isClearable={false}
                        value={typeSelected}
                        options={typeRef} onChange={e => setTypeSelected(e)}></Select>
                }
                </td>
                <td className="px-3">{modification ? spendingRef.find(spending => spending.value === operation.spending, 1).label : 
                        <Select d="selection-type" className="form-select form-select-sm w-100" 
                        isSearchable={true} isClearable={false}
                        value={spendingSelected}
                        options={spendingRef} onChange={e => setSpendingSelected(e)}></Select>
                
                }</td>
                <td>
                    {modification?
                    (<div className="px-1">
                        <div className="btn" onClick={e => {setModification(!modification)}}><FontAwesomeIcon icon={['fas', 'sliders-h']} color="var(--warning)"/></div>
                        <div className="btn" onClick={e => {setShowModalConfirm(true)}}><FontAwesomeIcon icon={['fas','trash']} color="var(--danger)"/></div>
                    </div>) :
                    (<div className="px-1">
                        <div className="btn" onClick={e => {setModification(!modification)}}><FontAwesomeIcon icon={['fas', 'sliders-h']} color="var(--danger)"/></div>
                        <div className="btn" onClick={e => {handleValidation(operation)}}><FontAwesomeIcon icon={['fas','check']} color="var(--success)"/></div>
                    </div>) }

                </td>
            </tr>
            <ModalConfirmation data={operation} showModal={showModalConfirm} setShowModal={setShowModalConfirm} who="operation" key={uuid()} />
        </>
    )
}

export default OperationRow
