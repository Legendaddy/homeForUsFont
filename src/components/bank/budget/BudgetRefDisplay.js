/* import React*/
import React, { useEffect } from 'react';
import { v4 as uuid } from 'uuid';

/* Redux import */
import { useSelector, useDispatch} from 'react-redux'
import RefInput from './budgetRefTable/RefInput';
import RefRow from './budgetRefTable/RefRow';
import { standardRecovering } from '../../../redux/Bank/actionBank';

function BudgetRefDisplay({accountNumber, accountUser}) {
    //#region 
    const accountRef = useSelector(state=>state.bank.standard);
    const dispatch = useDispatch();
    //#endregion

    //#region
    useEffect(() => {
        dispatch(standardRecovering(accountUser, accountNumber));
    }, [])

    //#endregion
    return (
        <>
        <div className="card-body">
            <div className="card-title px-3 mb-5 border-bottom">
             <div className=" h4 mb-3">
                    COMPTE: {accountNumber}
                </div>
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
                    <RefInput accountNumber={accountNumber} accountUser={accountUser}/> 
                    {
                        accountRef.sort(function (a, b) {
                            return a.day - b.day;
                          }).map(ref => {
                           return(<RefRow row={ref} key={uuid()}/>)
                        })
                    }
                </tbody>
            </table> 
        </div>

        </>
    )
}

export default BudgetRefDisplay
