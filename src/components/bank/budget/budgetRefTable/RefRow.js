/* import React*/
import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

/* import Redux */
import { useSelector, useDispatch }  from 'react-redux';

/* external component */
import Select from 'react-select';

/* Redux import */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalConfirmation from '../../modal/ModalConfirmation';
import { standardDelete, standardUpdate } from '../../../../redux/Bank/actionBank';

function RefRow({row}) {
    //#region 
    const typeRef = useSelector(state=> state.bank.type);
    const spendingRef = useSelector(state => state.bank.spending);
    const dispatch = useDispatch();
    const deleteStandard = useDispatch(standardDelete)
    //#endregion

    //#region  local storage 
    const [day, setDay] = useState(row.day);
    const [amount, setAmount] = useState(row.amount);
    const [comments, setComments] = useState(row.comments);
    const [typeSelected, setTypeSelected] = useState(typeRef.find(type => type.value === row.type, 1));
    const [spendingSelected, setSpendingSelected] = useState(spendingRef.find(spending => spending.value === row.spending, 1));
    const [activated, setActivated] = useState(row.activated);

    //#endregion
    //#region 
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const [modification, setModification ] = useState(true);

    //#endregion

    //#region 
    const handleValidation = (reference) => {
        dispatch(standardUpdate(reference.id, day, amount, comments, typeSelected.value, spendingSelected.value, activated));
        setModification(!modification);
    };
    //#endregion


    return (
            <>
            <tr key={uuid()}>
                <td className="px-3">{modification ? row.day : <input id="update-day" className="form-control"  type="number" value={day} 
                        onChange={e=> setDay(e.target.value)} /> }</td>
                <td className="px-3">{modification ? row.amount + "€": <input id="update-day" className="form-control"  type="number" value={amount} 
                        onChange={e=> setAmount(e.target.value)} /> } </td>
                <td className="px-3">{modification ? row.comments : <input id="update-day" className="form-control"  type="text" value={comments} 
                        onChange={e=> {e.preventDefault(); setComments(e.target.value)}}     />}</td>
                <td className="px-3">{modification ? typeRef.find(type => type.value === row.type, 1).label :
                        <Select d="selection-type" className="form-select form-select-sm w-100" 
                        isSearchable={false} isClearable={false}
                        value={typeSelected}
                        options={typeRef} onChange={e => setTypeSelected(e)}></Select>
                }
                </td>
                <td className="px-3">{modification ? spendingRef.find(spending => spending.value === row.spending, 1).label : 
                        <Select d="selection-type" className="form-select form-select-sm w-100" 
                        isSearchable={true} isClearable={false}
                        value={spendingSelected}
                        options={spendingRef} onChange={e => setSpendingSelected(e)}></Select>
                
                }</td>
                <td className="row flex justify-content-center">
                    <div className="h-25 w-25 ">
                    <input id="update-day" className="form-control"  type="checkbox" checked={activated} disabled={modification} onChange={e=> setActivated(!activated)} />
                    </div>
                </td>
                <td>
                    {modification?
                    (<div className="px-1">
                        <div className="btn" onClick={e => {setModification(!modification)}}><FontAwesomeIcon icon={['fas', 'sliders-h']} color="var(--warning)"/></div>
                        <div className="btn" onClick={e => {setShowModalConfirm(true)}}><FontAwesomeIcon icon={['fas','trash']} color="var(--danger)"/></div>
                    </div>) :
                    (<div className="px-1">
                        <div className="btn" onClick={e => {setModification(!modification)}}><FontAwesomeIcon icon={['fas', 'sliders-h']} color="var(--danger)"/></div>
                        <div className="btn" onClick={e => {handleValidation(row)}}><FontAwesomeIcon icon={['fas','check']} color="var(--success)"/></div>
                    </div>) }

                </td>
            </tr>
            <ModalConfirmation data={row} showModal={showModalConfirm} setShowModal={setShowModalConfirm} who="standard" key={uuid()} />
            </>
        );
};

export default RefRow;
