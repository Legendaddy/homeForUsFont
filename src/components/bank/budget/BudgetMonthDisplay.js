/* React library */
import React, { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid';

/* Redux library */
import { useSelector, useDispatch} from 'react-redux'

/* React personnal library */
import BudgetInput from './budgetMonthTable/BudgetInput';
import BudgetRow from './budgetMonthTable/BudgetRow';
import BudgetGeneratedMonth from '../modal/BudgetGeneratedMonth';
/* Redux action */
import { monthBudgetRecorvering } from '../../../redux/Bank/actionBank'

function BudgetMonthDisplay({accountNumber, accountUser}) {
    //#region 
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [modalGeneration, setModalGeneration] = useState(false);
    //#endregion
    
    //#region 
    const budgets = useSelector(state=>state.bank.monthBudget);
    const dispatch = useDispatch();
    //#endregion

    const dateEvol = (month) => {
        if (month > 12){
            setMonth(1);
            setYear(year + 1)
        }else if (month < 1){
            setMonth(12);
            setYear(year - 1)
        }else{
            setMonth(month)
        }
            
    }

    //#region
    useEffect(() => {
        dispatch(monthBudgetRecorvering(accountUser, accountNumber, month, year));
    }, [month, year])

    //#endregion

    return (
        <>
        <div className="card-body">
            <div className="card-title d-flex justify-content-between px-3 mb-3 border-bottom">
                <div className=" h4">
                    COMPTE: {accountNumber}
                </div>
                <form className="d-flex align-middle align-items-center px-3 mb-1">
                    <label forhtml="budget-month"> Mois:</label>
                    <input id="budget-month" className="form-control mx-2" type="number" value={month} onChange={e=> dateEvol(e.target.value)}>
                    </input>
                    <label forhtml="budget-year"> Année:</label>
                    <input id="budget-year" className="form-control mx-2" type="number" value={year} onChange={e => setYear(e.target.value)}>
                    </input>
                    <input id="generate" className="w-25 btn btn-info mx-2" type="button" value="+" onClick={e => setModalGeneration(true)}>
                    </input>
                </form>
            </div>
            <table className="table table-sm table-striped" style={{borderCollapse: "collapse"}}>
                <thead>
                    <tr>
                        <th className="border-0" style={{width: "5%"}} scope="col">Day</th>
                        <th className="border-0" style={{width: "7%"}} scope="col">Montant</th>
                        <th className="border-0" style={{width: "20%"}} scope="col">commentaires</th>
                        <th className="border-0" style={{width: "10%"}} scope="col">Type</th>
                        <th className="border-0" style={{width: "10%"}} scope="col">Dépense</th>
                        <th className="border-0" style={{width: "5%"}} scope="col">Activé?</th>
                        <th className="border-0" style={{width: "3%"}} scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <BudgetInput accountNumber={accountNumber} accountUser={accountUser} month={month} year={year}/>
                    {
                        budgets.sort(function (a, b) {
                            return a.day - b.day;
                          }).map(budget => {
                           return(<BudgetRow row={budget} month={month} year={year} key={uuid()}/>)
                        })
                    }
                </tbody>
            </table> 
        </div>
        <BudgetGeneratedMonth accountNumber={accountNumber} accountUser={accountUser} showModal={modalGeneration} setShowModal={setModalGeneration} month={month} year={year} key={uuid()} />
        </>
    )
}

export default BudgetMonthDisplay;
