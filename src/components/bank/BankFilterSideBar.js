import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import '../../styles/SideBar.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH, faEng } from '@fortawesome/free-solid-svg-icons'

function BankFilterSideBar() {

    const [displaySideBar, setDisplaySideBar] = useState(false)

    //#region declaration
        const [account, setAccount] = useState({});
        const [propritaire, setPropreitaire] = useState({});
        const [frais, setFrais] = useState({});
        const [spending, setSpending] = useState({});
        const [debut, setDebut] = useState(Date);
        const [fin, setFin] = useState(Date);
    //#endregion


    useEffect(() => {
        const elt = document.getElementById("sidebar")
        const filterSide = document.getElementById("filter")
        
        if(displaySideBar){
            elt.classList.add("isOpen");
            filterSide.classList.add("filter-display")
        }else{
            elt.classList.remove("isOpen");
            filterSide.classList.remove("filter-display")
        }; 
    }, [displaySideBar]);

    return (
        <nav id="sidebar" className="sidebar">
            <div className="mx-auto my-2"> 
                <button id="button-open-sidebar" type="button" className="btn" onClick={()=> setDisplaySideBar(!displaySideBar)}><FontAwesomeIcon icon={faSlidersH} color="#FFF" size="2x" /></button>
            </div>
            <div id="filter" className="filter">
                <div className="my-2">
                    <label htmlFor="filter-account">Compte</label>
                    <Select id="filter-account" className="form-select form-select-sm"></Select>
                </div>
                <div className="my-2">
                    <label htmlFor="filter-user">Proprietaire</label>
                    <Select id="filter-user" className="form-select form-select-sm"></Select>
                </div>
                <div className="my-2">
                    <label htmlFor="filter-frais">Groupe de frais</label>
                    <Select id="filter-frais" className="form-select form-select-sm "></Select>
                </div>
                <div className="my-2">
                    <label htmlFor="filter-spend">Groupe de dépense</label>
                    <Select id="filter-spend" className="form-select form-select-sm "></Select>
                </div>
                <div className="mt-2">
                    <hr className="text-light"/>
                    <div className="text-right"><FontAwesomeIcon icon={faSlidersH}></FontAwesomeIcon></div>
                    
                    <div className="d-flex flex-column my-2">
                        <label htmlFor="filter-dateBegin">Debut</label>
                        <input id="filter-dateBegin" className="text-muted align-baseline w-auto" type="date"></input>
                    </div>
                    <div className="d-flex flex-column my-2">
                        <label htmlFor="filter-dateEnd">Fin</label>
                        <input id="filter-dateEnd" className="text-muted align-baseline w-auto" type="date"></input> 
                    </div>
                </div>

            </div>
        </nav>
    )
}

export default BankFilterSideBar
