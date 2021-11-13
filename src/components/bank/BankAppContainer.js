import React, {useState, useEffect } from 'react'
import BankFilterSideBar from './BankFilterSideBar'
import BankHeaderMenu from './BankHeaderMenu'

/* Redux import */
import { useDispatch} from 'react-redux'
import { bankRecovering, accountRecovering, spendingRecovering, typeRecovering, operationsRecovering } from '../../redux/Bank/actionBank';

import '../../styles/Account/styles.css'
import AccountSynthese from './synthese/AccountSynthese'
import AccountConfig from './userConfig/AccountConfig'
import BudgetMain from './budget/BudgetMain'
import OperationInput from './operationInput/OperationInput'
import ImportOperation from './importOperation/ImportOperation';



function BankAppContainer(vue) {

    const[display, setDisplay] = useState('');
    
    useEffect(() => {
        switch (vue) {          
            case "account":
                setDisplay(
                    <div className="d-flex ">
                        <div className="row m-2 w-100">
                            <AccountConfig/>
                        </div>
                    </div>
                )
                break;
            case "budget":
                    setDisplay(
                        <div className="d-flex ">
                            <div className="row m-2 w-100">
                                <BudgetMain/>
                            </div>
                        </div>
                    )
                    break;
            case "input":
                setDisplay(
                    <div className="d-flex ">
                        <div className="row m-2 w-100">
                            <OperationInput/>
                        </div>
                    </div>
                )
                break;
            case "import":
                setDisplay(
                    <div className="d-flex ">
                        <div className="row m-2 w-100">
                            <ImportOperation/>
                        </div>
                    </div>
                )
                break;
            case "main":
            default: 
                setDisplay(
                    <div className="d-flex ">
                        <BankFilterSideBar/> 
                        <div className="row m-2 w-100">
                            <AccountSynthese/>
                        </div>
                    </div>
                )
        }
    }, [vue]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(bankRecovering());
        dispatch(spendingRecovering());
        dispatch(typeRecovering());
        dispatch(accountRecovering());
        dispatch(operationsRecovering());
    }, [])


    return (
        <div className="container-fluid h-100 w-100">
            <BankHeaderMenu/>
            {display}
        </div>
    );
};

export default BankAppContainer;


