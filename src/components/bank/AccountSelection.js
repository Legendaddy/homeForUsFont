/* import React*/
import React from 'react';
import { v4 as uuid } from 'uuid';

/* Redux import */
import { useSelector } from 'react-redux'

/* Personnal component */

function AccountSelection({accountSelected, setAccountSelected, setAccountUser, deselection}) {
    //#region 
    const accounts = useSelector(state=> state.bank.accounts);
    //#endregion

    //#region 
    const handleSelection = (userName, number) => {
        if (deselection & accountSelected === number){
            setAccountUser('');
            setAccountSelected(0);
        }else{
            setAccountSelected(number);
            setAccountUser(userName);
        }
    };
    //#endregion

    return (
        <>
            {accounts.map(account => {
                const style = account.number===accountSelected?{color:"var(--white)", background:"var(--dark"}:{color:"var(--dark)", background:"var(--white"}
                return(
                    <div className="card btn my-3" key={uuid()} style={style} onClick={e => handleSelection(account.user, account.number)}>
                        <div className="card-body">
                            <div>Compte : {account.number}</div>
                            <hr/>
                            <div>{account.user}</div>
                        </div>
                    </div>
                )
            })}
        </>
    );
};

export default AccountSelection;
