/* REACT */
import React, { useState } from 'react';

/* REDUX */
import { useDispatch, useSelector } from 'react-redux';

/* external component */
import Select from 'react-select';
import { monthBudgetAdd } from '../../../../redux/Bank/actionBank';


function BudgetInput({accountNumber, accountUser, month, year}) {
    //#region  local storage 
    const [date, setDate] = useState(new Date().toISOString().slice(0,10));
    const [amount, setAmount] = useState(0.0);
    const [comment, setComment] = useState('');
    const [typeSelected, setTypeSelected] = useState({});
    const [spendingSelected, setSpendingSelected] = useState({});
    const [activated, setActivated] = useState(true);

    //#endregion

    //#region  redux data //
    const typeRef = useSelector(state=> state.bank.type);
    const spendingRef = useSelector(state => state.bank.spending);

    const dispatch = useDispatch();

    //#endregion

    //#region  local method
    const addNewReference = () => {
        dispatch(monthBudgetAdd(accountNumber, accountUser, month, year, date, amount, comment, typeSelected.value, spendingSelected.value, activated));
    };

    //#endregion


    return (
        <tr>
            <td className="px-3"><input id="new-date" className="form-control"  type="date" value={date} onChange={e=>setDate(e.target.value)}/></td>
            <td className="px-3"><input id="new-amount" className="form-control" type="number" value={amount} onChange={e=>setAmount(e.target.value)}/></td>
            <td className="px-3"><input id="new-comment" className="form-control"  type="text" value={comment} onChange={e=>setComment(e.target.value)}/></td>

            <td className="px-3"><Select d="selection-type" className="form-select form-select-sm w-100" 
            isSearchable={false} isClearable={false}
            options={typeRef} onChange={e => setTypeSelected(e)}></Select></td>

            <td className="px-3"><Select d="selection-type" className="form-select form-select-sm w-100" 
            isSearchable={true} isClearable={false}
            options={spendingRef} onChange={e => setSpendingSelected(e)}></Select></td> 

            <td className="row flex justify-content-center">
                <div className="h-25 w-25 ">
                <input id="new-day" className="form-control"  type="checkbox" onChange={e=> setActivated(!activated)} />
                </div>
            </td>
                
            <td className="px-3"><input id="new-submmit" type="button" className="btn btn-success" value="Ajout" onClick={addNewReference}/></td>
        </tr> 
    );
};

export default BudgetInput;
