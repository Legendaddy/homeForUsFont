import React, {useState} from 'react'
import AccountSelection from '../AccountSelection'

import {useSelector} from 'react'
import OperationDisplay from './OperationDisplay'

function OperationInput() {
    const [accountSelected, setAccounSelected] = useState(0)
    const [accountUser, setAccountUser] = useState('')
    

    return (
        <div className="w-100">
            <div>
                <h2 className="display-4 text-center">Gestion Comptes </h2>
            </div>
            <div className="row justify-content-between w100 rounded-lg border mx-1 bg-dark " style={{height:"40px"}}> 
            </div>
            <section className="row d-flex justify-content-between mx-auto mt-3">
                <div className="col-2 ">
                    <AccountSelection accountSelected={accountSelected} setAccountSelected={setAccounSelected} setAccountUser={setAccountUser} deselection={true}/>
                </div>
                <div className="col-10 card">
                    <OperationDisplay accountSelected={accountSelected!==0 ? accountSelected:null}/>
                </div>
            </section>
        </div>
    )
}

export default OperationInput
