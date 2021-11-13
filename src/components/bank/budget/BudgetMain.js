import React , {useState, useEffect} from 'react'
import { v4 as uuid } from 'uuid';
import BudgetMonthDisplay from './BudgetMonthDisplay';
import BudgetRefDisplay from './BudgetRefDisplay'
import AccountSelection from '../AccountSelection';

function BudgetMain() {
    //#region DOM DISPLAY
    const [mainChoice, setMainChoice] = useState('REF')
    const [btnRefStyle, setBtnRefStyle] = useState({color:"var(--white)", background:"var(--dark)"})
    const [btnBudgetStyle, setBtnBudgetStyle] = useState({color:"var(--dark)", background:"var(--white)"})

    //#endregion
    const [accountSelected, setAccounSelected] = useState(0)
    const [accountUser, setAccountUser] = useState('')

    useEffect(() => {
       switch(mainChoice){
           case "REF":
                setBtnRefStyle({color:"var(--white)", background:"var(--dark)"})
                setBtnBudgetStyle({color:"var(--dark)", background:"var(--white)"})
                break;
            case "BUDGET":
                setBtnRefStyle({color:"var(--dark)", background:"var(--white)"})
                setBtnBudgetStyle({color:"var(--white)", background:"var(--dark)"})
                break;
            default:
                break;
       }
    }, [mainChoice])

    return (
        <div className="w-100">
            <div><h2 className="display-4 text-center">Gestion des budgets </h2></div>
            <div className="row justify-content-between w100 rounded-lg border mx-1"> 
                <div className="col-6 btn border-right text-center text-uppercase" style={btnRefStyle} onClick={e=>setMainChoice("REF")}> Referentiel </div>
                <div className="col-6 btn text-center text-uppercase" style={btnBudgetStyle} onClick={e=>setMainChoice("BUDGET")}> Mensuel </div>
            </div>

            <section className="row d-flex justify-content-between mx-auto mt-3">
                <div className="col-2 ">
                    <AccountSelection accountSelected={accountSelected} setAccountSelected={setAccounSelected} setAccountUser={setAccountUser} deselection={false}/>
                </div>
                <div className="col-10 card">
                    {
                        accountSelected===0?<div className="text-center align-middle my-5"> Selectionné un compte</div>:null
                    }
                    {
                        accountSelected!==0&mainChoice==="REF"?<BudgetRefDisplay accountNumber={accountSelected} accountUser={accountUser} key={uuid()}/>:null
                    }
                    {
                        accountSelected!==0&mainChoice==="BUDGET"?<BudgetMonthDisplay accountNumber={accountSelected} accountUser={accountUser}key={uuid()}/>:null
                    }
                </div>
            </section>
        </div>
    )
}

export default BudgetMain
