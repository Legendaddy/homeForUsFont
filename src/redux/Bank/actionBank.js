import axios from "axios";
import {bankUrl} from '../../config';

import {BANK_ACCOUNT_ACTIVATION, BANK_ACCOUNT_CREATED, BANK_ACCOUNT_RECOVERED, 
    BANK_ACCOUNT_UPDATED, BANK_NAME_RECOVERED, BANK_REQUEST_ERROR, BANK_REQUEST_SUBMIT, 
    BANK_SPENDING_RECOVERED, BANK_STANDARD_BUDGET_RECOVERED, 
    BANK_TYPE_RECOVERED, BANK_STANDARD_BUDGET_CREATED, BANK_STANDARD_BUDGET_DELETED, 
    BANK_STANDARD_BUDGET_UPDATED, BANK_MONTH_BUDGET_RECOVERED, BANK_MONTH_BUDGET_CREATED, 
    BANK_MONTH_BUDGET_DELETED, BANK_MONTH_BUDGET_GENERATED, BANK_OPERATION_RECOVERED, BANK_OPERATION_ADDED, BANK_OPERATION_DELETED} from './type'

import {messageError} from '../Message/actionMessage';

// ----------------------------------------------------------------------------------------------------
//#region BANK 
export const bankRecovering = () => (dispatch, getState) => {
    dispatch({type:BANK_REQUEST_SUBMIT});
    
    let headersList = {
        "Authorization": `Token ${getState().auth.token}` ,
        "Content-Type": "application/json" 
    }
    
    let reqOptions = {
        url:  bankUrl + "banklist/",
        method: "GET",
        headers: headersList
    }
    
    axios.request(reqOptions)
    .then((reponse) => {
        dispatch({
            type: BANK_NAME_RECOVERED,
            payload: reponse.data
        });
    })
    .catch((err) => {
        dispatch({
            type:BANK_REQUEST_ERROR
        });
    });
};
//#endregion

// ----------------------------------------------------------------------------------------------------
//#region REFERENTIEL
export const spendingRecovering = () => (dispatch, getState) => {
    dispatch({type:BANK_REQUEST_SUBMIT});
    
    let headersList = {
        "Authorization": `Token ${getState().auth.token}` ,
        "Content-Type": "application/json" 
    };
    
    let reqOptions = {
        url:  bankUrl + "spending/",
        method: "GET",
        headers: headersList
    };
    
    axios.request(reqOptions)
    .then((reponse) => {
        dispatch({
            type: BANK_SPENDING_RECOVERED,
            payload: reponse.data
        });
    })
    .catch((err) => {
        dispatch({
            type:BANK_REQUEST_ERROR
        });
    });
};

export const typeRecovering = () => (dispatch, getState) => {
    dispatch({type:BANK_REQUEST_SUBMIT});
    
    let headersList = {
        "Authorization": `Token ${getState().auth.token}` ,
        "Content-Type": "application/json" 
    };
    
    let reqOptions = {
        url:  bankUrl + "type/",
        method: "GET",
        headers: headersList
    };

    axios.request(reqOptions)
    .then((reponse) => {
        dispatch({
            type: BANK_TYPE_RECOVERED,
            payload: reponse.data
        });
    })
    .catch((err) => {
        dispatch({
            type:BANK_REQUEST_ERROR,
        });
    });
};

//#endregion

// ----------------------------------------------------------------------------------------------------
//#region ACCOUNT
export const accountRecovering = () => (dispatch, getState) => {
    dispatch({type:BANK_REQUEST_SUBMIT});
    let headersList = {
        "Authorization": `Token ${getState().auth.token}` ,
        "Content-Type": "application/json" 
    }
    
    let reqOptions = {
        url:  bankUrl + "account",
        method: "GET",
        headers: headersList
    }
    
    axios.request(reqOptions)
    .then((reponse) => {
        dispatch({
            type: BANK_ACCOUNT_RECOVERED,
            payload: reponse.data
        });
    })
    .catch((err) => {
        dispatch({
            type:BANK_REQUEST_ERROR
        });
        dispatch(messageError(err))
    });

};

export const accountCreation = (bankName, description, accountNumber, famillyName, userName) => (dispatch, getState) => {
    dispatch({type: BANK_REQUEST_SUBMIT});
    let headersList = {
        "Authorization": `Token ${getState().auth.token}` ,
        "Content-Type": "application/json" 
    };
    
    let data = {
            "bankName": bankName,
            "description": description,
            "number": accountNumber,
            "userName": userName,
            "famillyName": famillyName
        }
    
        let reqOptions = {
            url:  bankUrl + `account`,
            method: "POST",
            headers: headersList,
            data: data
        }
    
axios.request(reqOptions)
    .then((reponse) => {
        dispatch({
            type: BANK_ACCOUNT_CREATED,
            payload: reponse.data
        });
    })
    .catch((err) => {
        dispatch({
            type:BANK_REQUEST_ERROR
        });
        dispatch(messageError(err))
    });
};

export const accountActivationUpdate = (accountNumber, famillyName, userName, valueActivation) => (dispatch, getState) =>{
    dispatch({type: BANK_REQUEST_SUBMIT});
    let headersList = {
        "Authorization": `Token ${getState().auth.token}` ,
        "Content-Type": "application/json" 
    };
    
    let data = {
            "mode": "activation",
            "data": {
                "number": accountNumber,
                "userName": userName,
                "famillyName": famillyName,
                "action": valueActivation
            }   
        }
    
        let reqOptions = {
            url:  bankUrl + "account",
            method: "PUT",
            headers: headersList,
            data : data
        }

    axios.request(reqOptions)
    .then((reponse) => {
        dispatch({
            type: BANK_ACCOUNT_ACTIVATION,
            payload: reponse.data
        });
    })
    .catch((err) => {
        dispatch({
            type:BANK_REQUEST_ERROR
        });
        dispatch(messageError(err))
    });
};

export const accountGeneralUpdate = (bankName, description, accountNumber, famillyName, userName) => (dispatch, getState) =>{
    dispatch({type: BANK_REQUEST_SUBMIT});
    let headersList = {
        "Authorization": `Token ${getState().auth.token}` ,
        "Content-Type": "application/json" 
    };
    
    famillyName = famillyName === undefined ? '' : famillyName

    let data = {
            "mode": "update",
            "data": {
                "number": accountNumber,
                "userName": userName,
                "famillyName": famillyName,
                "description": description,
                "bankName" : bankName
            }   
        }
    
    let reqOptions = {
        url:  bankUrl + "account",
        method: "PUT",
        headers: headersList,
        data : data
    }

    axios.request(reqOptions)
    .then((reponse) => {
        dispatch({
            type: BANK_ACCOUNT_UPDATED,
            payload: reponse.data
        });
    })
    .catch((err) => {
        dispatch({
            type:BANK_REQUEST_ERROR
        });
        dispatch(messageError(err))
    });
};

export const accountOffsetAdd = (accountNumber, accountUser, dateOffset, amount) => (dispatch, getState) =>{
    dispatch({type: BANK_REQUEST_SUBMIT});
    let headersList = {
        "Authorization": `Token ${getState().auth.token}` ,
        "Content-Type": "application/json" 
    };

    let data = {
                "account_number": accountNumber,
                "account_user": accountUser,
                "date_offset": dateOffset,
                "amount": amount,
                "activated" : true 
        }
    
    let reqOptions = {
        url:  bankUrl + "account-offset",
        method: "POST",
        headers: headersList,
        data : data
    }

    axios.request(reqOptions)
    .then((reponse) => {
        dispatch({
            type: BANK_ACCOUNT_UPDATED,
            payload: reponse.data
        });
    })
    .catch((err) => {
        dispatch({
            type:BANK_REQUEST_ERROR
        });
        dispatch(messageError(err))
    });
};
//#endregion

// ----------------------------------------------------------------------------------------------------
//#region Standard budget

export const standardRecovering = (userName, number) => (dispatch, getState) => {
    dispatch({type:BANK_REQUEST_SUBMIT});
    let headersList = {
        "Authorization": `Token ${getState().auth.token}` ,
        "Content-Type": "application/json" 
    };

    let reqOptions = {
        url:  bankUrl + `standard-budget?user=${userName}&number=${number}`,
        method: "GET",
        headers: headersList,
    }

    axios.request(reqOptions)
    .then((reponse) => {
        if(reponse.status === 200){
            dispatch({
                type: BANK_STANDARD_BUDGET_RECOVERED,
                payload: reponse.data
            });
        }
        else{
            dispatch({
                type: BANK_STANDARD_BUDGET_RECOVERED,
                payload: []
            });
        };
    })
    .catch((err) => {
        dispatch({
            type:BANK_REQUEST_ERROR
        });
        dispatch(messageError(err))
    });
};

export const standardAdd = (accountNumber, accountUser, day, amount, comment, typeId, spendingId, activated) => (dispatch, getState) =>{
    dispatch({type:BANK_REQUEST_SUBMIT});
    let headersList = {
        "Authorization": `Token ${getState().auth.token}` ,
        "Content-Type": "application/json" 
    };

    let data = {
                "account_number": accountNumber,
                "account_user": accountUser,
                "day": day,
                "amount": amount,
                "comments" : comment, 
                "type": typeId,
                "spending": spendingId,
                "activated": activated
        };
    
    let reqOptions = {
        url:  bankUrl + "standard-budget",
        method: "POST",
        headers: headersList,
        data : data
    };

    axios.request(reqOptions)
    .then((reponse) => {
        dispatch({
            type: BANK_STANDARD_BUDGET_CREATED,
            payload: reponse.data
        });
    })
    .catch((err) => {
        dispatch({
            type:BANK_REQUEST_ERROR
        });
        dispatch(messageError(err))
    });
};

export const standardDelete = (id, accountNumber, accountUser ) => (dispatch, getState) => {
    dispatch({type:BANK_REQUEST_SUBMIT});
    let headersList = {
        "Authorization": `Token ${getState().auth.token}` ,
        "Content-Type": "application/json" 
    };

    let data = {"id": id,
                "account_number": accountNumber,
                "account_user": accountUser
        };
    
    let reqOptions = {
        url:  bankUrl + "standard-budget",
        method: "DELETE",
        headers: headersList,
        data : data
    };

    axios.request(reqOptions)
    .then((reponse) => {
        dispatch({
            type: BANK_STANDARD_BUDGET_DELETED,
            payload: reponse.data
        });
    })
    .catch((err) => {
        dispatch({
            type:BANK_REQUEST_ERROR
        });
        dispatch(messageError(err))
    });

};

export const standardUpdate = (id, day, amount, comments, type, spending, activated) => (dispatch, getState) => {
    dispatch({type:BANK_REQUEST_SUBMIT});
    let headersList = {
        "Authorization": `Token ${getState().auth.token}` ,
        "Content-Type": "application/json" 
    };

    let data = {"id": id,
                "day": day,
                "amount": amount,
                "comments": comments,
                "type": type,
                "spending": spending,
                "activated": activated
        };
    
    let reqOptions = {
        url:  bankUrl + "standard-budget",
        method: "PUT",
        headers: headersList,
        data : data
    };

    axios.request(reqOptions)
    .then((reponse) => {
        dispatch({
            type: BANK_STANDARD_BUDGET_UPDATED,
            payload: reponse.data
        });
    })
    .catch((err) => {
        dispatch({
            type:BANK_REQUEST_ERROR
        });
        dispatch(messageError(err))
    });
};

//#endregion 

// ----------------------------------------------------------------------------------------------------
//#region Month budget
export const monthBudgetRecorvering = (userName, number, month, year) => (dispatch, getState) => {
    dispatch({type:BANK_REQUEST_SUBMIT});
    let headersList = {
        "Authorization": `Token ${getState().auth.token}` ,
        "Content-Type": "application/json" 
    };

    let reqOptions = {
        url:  bankUrl + `monthly-budget?user=${userName}&number=${number}&month=${month}&year=${year}`,
        method: "GET",
        headers: headersList,
    }

    axios.request(reqOptions)
    .then((reponse) => {
        if(reponse.status === 200){
            dispatch({
                type: BANK_MONTH_BUDGET_RECOVERED,
                payload: reponse.data
            });
        }
        else{
            dispatch({
                type: BANK_STANDARD_BUDGET_RECOVERED,
                payload: []
            });
        };
    })
    .catch((err) => {
        dispatch({
            type:BANK_REQUEST_ERROR
        });
        dispatch(messageError(err))
    });
};

export const monthBudgetAdd = (accountNumber, accountUser, month, year, date_ref, amount, comment, typeId, spendingId, activated) => (dispatch, getState) =>{
    dispatch({type:BANK_REQUEST_SUBMIT});
    let headersList = {
        "Authorization": `Token ${getState().auth.token}` ,
        "Content-Type": "application/json" 
    };

    let data = {
                "account_number": accountNumber,
                "account_user": accountUser,
                "month" : month,
                "year" : year,
                "date_ref": date_ref,
                "amount": amount,
                "comments" : comment, 
                "type": typeId,
                "spending": spendingId,
                "activated": activated
        };
    
    let reqOptions = {
        url:  bankUrl + "monthly-budget",
        method: "POST",
        headers: headersList,
        data : data
    };

    axios.request(reqOptions)
    .then((reponse) => {
        dispatch({
            type: BANK_MONTH_BUDGET_CREATED,
            payload: reponse.data
        });
    })
    .catch((err) => {
        dispatch({
            type:BANK_REQUEST_ERROR
        });
        dispatch(messageError(err))
    });

};

export const monthBudgetDelete = (id, accountNumber, accountUser, month, year ) => (dispatch, getState) => {
    dispatch({type:BANK_REQUEST_SUBMIT});
    let headersList = {
        "Authorization": `Token ${getState().auth.token}` ,
        "Content-Type": "application/json" 
    };
    
    let reqOptions = {
        url:  bankUrl + `monthly-budget?user=${accountUser}&number=${accountNumber}&month=${month}&year=${year}&id=${id}`,
        method: "DELETE",
        headers: headersList
    };

    axios.request(reqOptions)
    .then((reponse) => {
        dispatch({
            type: BANK_MONTH_BUDGET_DELETED,
            payload: reponse.data
        });
    })
    .catch((err) => {
        dispatch({
            type:BANK_REQUEST_ERROR
        });
        dispatch(messageError(err))
    });

};

export const monthBudgetUpdate = (id, date_ref, amount, comments, type, spending, activated, month, year) => (dispatch, getState) => {
    dispatch({type:BANK_REQUEST_SUBMIT});
    let headersList = {
        "Authorization": `Token ${getState().auth.token}` ,
        "Content-Type": "application/json" 
    };

    let data = {"id": id,
                "month": month,
                "year": year,
                "date_ref": date_ref,
                "amount": amount,
                "comments": comments,
                "type": type,
                "spending": spending,
                "activated": activated
        };
    
    let reqOptions = {
        url:  bankUrl + "monthly-budget",
        method: "PUT",
        headers: headersList,
        data : data
    };

    axios.request(reqOptions)
    .then((reponse) => {
        dispatch({
            type: BANK_STANDARD_BUDGET_UPDATED,
            payload: reponse.data
        });
    })
    .catch((err) => {
        dispatch({
            type:BANK_REQUEST_ERROR
        });
        dispatch(messageError(err))
    });
};

export const monthBudgetDuplicate = () => (dispatch, getState) => {

};

export const monthGenerateBudget = (accountNumber, accountUser, mode, month, year) => (dispatch, getState) => {
    dispatch({type:BANK_REQUEST_SUBMIT});
    let headersList = {
        "Authorization": `Token ${getState().auth.token}` ,
        "Content-Type": "application/json" 
    };

    let data = {"number": accountNumber,
                "username": accountUser,
                "mode": mode,
                "month": month,
                "year": year,
        };
    
    let reqOptions = {
        url:  bankUrl + "monthly-generation",
        method: "POST",
        headers: headersList,
        data : data
    };

    axios.request(reqOptions)
    .then((reponse) => {
        dispatch({
            type: BANK_MONTH_BUDGET_GENERATED,
            payload: reponse.data
        });
    })
    .catch((err) => {
        dispatch({
            type:BANK_REQUEST_ERROR
        });
        dispatch(messageError(err))
    });
};

//#endregion


// ----------------------------------------------------------------------------------------------------
//#region Operations
export const operationsRecovering = () => (dispatch, getState) => {
    dispatch({type:BANK_REQUEST_SUBMIT});
    let headersList = {
        "Authorization": `Token ${getState().auth.token}` ,
        "Content-Type": "application/json" 
    };

    let reqOptions = {
        url:  bankUrl + `operation`,
        method: "GET",
        headers: headersList,
    }

    axios.request(reqOptions)
    .then((reponse) => {
        if(reponse.status === 200){
            dispatch({
                type: BANK_OPERATION_RECOVERED,
                payload: reponse.data
            });
        };
    })
    .catch((err) => {
        dispatch({
            type:BANK_REQUEST_ERROR
        });
        dispatch(messageError(err))
    });
}

export const operationAdd = (date_operation, amount, description, typeId, spendingId, accountNumber, accountUser) => (dispatch, getState) => {
    dispatch({type:BANK_REQUEST_SUBMIT});
    let headersList = {
        "Authorization": `Token ${getState().auth.token}` ,
        "Content-Type": "application/json" 
    };

    let data = {
        "date_operation": date_operation,
        "amount": amount,
        "description": description,
        "type": typeId,
        "spending": spendingId,
        "account_number": accountNumber,
        "account_user": accountUser,
    };


    let reqOptions = {
        url:  bankUrl + `operation`,
        method: "POST",
        headers: headersList,
        data: data
    }

    axios.request(reqOptions)
    .then((reponse) => {
        if(reponse.status === 201){
            dispatch({
                type: BANK_OPERATION_ADDED,
                payload: reponse.data
            });
        }else{
            dispatch({
                type: BANK_REQUEST_ERROR,
            });
        };
    })
    .catch((err) => {
        dispatch({
            type:BANK_REQUEST_ERROR
        });
        dispatch(messageError(err))
    });
}

export const operationUpdate = (id, date_operation, amount, description, typeId, spendingId, accountNumber, accountUser) => (dispatch, getState) => {
    dispatch({type:BANK_REQUEST_SUBMIT});
    let headersList = {
        "Authorization": `Token ${getState().auth.token}` ,
        "Content-Type": "application/json" 
    };

    let data = {
        "id": id,
        "date_operation": date_operation,
        "amount": amount,
        "description": description,
        "type": typeId,
        "spending": spendingId,
        "account_number": accountNumber,
        "account_user": accountUser,
    };


    let reqOptions = {
        url:  bankUrl + `operation`,
        method: "PUT",
        headers: headersList,
        data: data
    }

    axios.request(reqOptions)
    .then((reponse) => {
        dispatch({
            type: BANK_OPERATION_ADDED,
            payload: reponse.data
        });
    
    })
    .catch((err) => {
        dispatch({
            type:BANK_REQUEST_ERROR
        });
        dispatch(messageError(err))
    });
};

export const operationDelete = (id) => (dispatch, getState) => {
    dispatch({type:BANK_REQUEST_SUBMIT});
    let headersList = {
        "Authorization": `Token ${getState().auth.token}` ,
        "Content-Type": "application/json" 
    };
    
    let reqOptions = {
        url:  bankUrl + `operation?id=${id}`,
        method: "DELETE",
        headers: headersList
    };

    axios.request(reqOptions)
    .then((reponse) => {
        dispatch({
            type: BANK_OPERATION_DELETED,
            payload: reponse.data
        });
    })
    .catch((err) => {
        dispatch({
            type:BANK_REQUEST_ERROR
        });
        dispatch(messageError(err))
    });

};

//#endregion 
