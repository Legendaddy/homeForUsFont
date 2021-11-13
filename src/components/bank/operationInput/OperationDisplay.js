/* React */
import React, {useState, useEffect} from 'react'
import { v4 as uuid } from 'uuid';

/* Redux */
import {useSelector} from 'react-redux'

/* Personnal library */
import OperationNew from './OperationNew'
import OperationRow from './OperationRow'

function OperationDisplay({accountSelected}) {
    const [filteredOperation, setFilteredOperation] = useState([])
    //#region 
    const operations = useSelector(state => state.bank.operations)
    //#endregion

    useEffect(() => {
        if (accountSelected !== null){
            setFilteredOperation(operations.filter(op => op.account.number === accountSelected));
        }else{
            setFilteredOperation(operations);
        };
    }, [accountSelected, operations]);

    return (
        <>
        <div className="card-body">
            <table className="table table-sm table-striped" style={{borderCollapse: "collapse"}}>
                <thead>
                    <tr>
                        <th className="border-0" style={{width: "5%"}} scope="col">Date</th>
                        <th className="border-0" style={{width: "12%"}} scope="col">Compte</th>
                        <th className="border-0" style={{width: "7%"}} scope="col">Montant</th>
                        <th className="border-0" style={{width: "15%"}} scope="col">commentaires</th>
                        <th className="border-0" style={{width: "10%"}} scope="col">Type</th>
                        <th className="border-0" style={{width: "10%"}} scope="col">Dépense</th>
                        <th className="border-0" style={{width: "3%"}} scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <OperationNew accountSelected={accountSelected}/>
                    {
                        filteredOperation.map(operation => {
                            return ( <OperationRow operation={operation} key={uuid()}/>)
                        })
                    }
                </tbody>
            </table> 
        </div>

        </>
    )
}

export default OperationDisplay;
