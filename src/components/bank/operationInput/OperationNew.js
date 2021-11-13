/* REACT */
import React, { useState, useEffect } from 'react';

/* REDUX */
import { useDispatch, useSelector } from 'react-redux';

/* external component */
import Select from 'react-select';
import { operationAdd } from '../../../redux/Bank/actionBank';
function OperationNew({accountSelected}) {

    //#region  local storage 
    const [date, setDate] = useState(0);
    const [account, setAccount] = useState({});
    const [amount, setAmount] = useState(0.0);
    const [description, setdescription] = useState('');
    const [typeSelected, setTypeSelected] = useState({});
    const [spendingSelected, setSpendingSelected] = useState({});

    const [accountList, setAccountList] = useState([]);
    //#endregion

    //#region  redux data //
    const typeRef = useSelector(state=> state.bank.type);
    const spendingRef = useSelector(state => state.bank.spending);
    const accounts = useSelector(state => state.bank.accounts);

    useEffect(() => {
        let datas = [];
        accounts.map(account => {
            datas.push({value: account.number, label: account.user.concat("-", account.number)});
        });
        setAccountList(datas);  
    }, [accounts]);

    useEffect(() => {
        if(accountSelected === null){
            setAccount({})
        }else{
            accounts.filter(acc => acc.number === accountSelected).map(acc => { 
                console.log({value: acc.number, label: acc.user.concat("-", acc.number)})
                setAccount({value: acc.number, label: acc.user.concat("-", acc.number)})
            })
        }
    }, [accountSelected])

    const dispatch = useDispatch();

    //#endregion

    //#region  local method
    const addNewReference = () => {
        dispatch(operationAdd(date, amount, description, typeSelected.value, spendingSelected.value, account.value, account.label.split('-')[0]))
    }

    //#endregion

    return (
        <tr>
            <td className="px-3"><input id="new-day" className="form-control"  type="date" value={date} onChange={e=>setDate(e.target.value)}/></td>

            <td className="px-3"><Select d="selection-type" className="form-select form-select-sm w-100" 
            isSearchable={false} isClearable={false} value={account}
            options={accountList} onChange={e => setAccount(e)}></Select></td>

            <td className="px-3"><input id="new-amount" className="form-control" type="number" value={amount} onChange={e=>setAmount(e.target.value)}/></td>
            <td className="px-3"><input id="new-description" className="form-control"  type="text" value={description} onChange={e=>setdescription(e.target.value)}/></td>

            <td className="px-3"><Select d="selection-type" className="form-select form-select-sm w-100" 
            isSearchable={false} isClearable={false}
            options={typeRef} onChange={e => setTypeSelected(e)}></Select></td>

            <td className="px-3"><Select d="selection-type" className="form-select form-select-sm w-100" 
            isSearchable={true} isClearable={false}
            options={spendingRef} onChange={e => setSpendingSelected(e)}></Select></td> 
                
            <td className="px-3"><input id="new-submmit" type="button" className="btn btn-success" value="Ajout" onClick={addNewReference}/></td>
        </tr> 
    )
};

export default OperationNew;
