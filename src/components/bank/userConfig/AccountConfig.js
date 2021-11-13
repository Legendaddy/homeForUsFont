/* import React*/
import React, { useEffect } from 'react';
import {v4 as uuid} from 'uuid';

/* Redux import */
import {useSelector, useDispatch} from 'react-redux'
import { bankRecovering, accountRecovering } from '../../../redux/Bank/actionBank';

/* Personnal component */
import AccountConfigInputs from './AccountConfigInputs';
import AccountConfigList from './AccountConfigList';



function AccountConfig() {
    const accounts = useSelector(state => state.bank.accounts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(bankRecovering())
        dispatch(accountRecovering())
    }, [])



    return (
       <>
       <AccountConfigInputs/>
       <hr className="my-2 w-100"/>
       <div className="h4">Mes comptes</div>
        {accounts.map(account => {
            return( <AccountConfigList account={account} key={uuid()}/>)
        })}
       </>
    )
}

export default AccountConfig;
