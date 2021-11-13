import axios from "axios";
import {famillyUrl} from '../../config'

import { FAMILLY_API_ERROR, FAMILLY_SUBMIT, FAMILLY_GET_INFO, FAMILLY_TRASH_DATA, FAMILLY_REMOVE_USER, FAMILLY_CREATED, FAMILLY_DELETE, FAMILLY_ADD_USER } from './type'

import {messageError, messageValid} from '../Message/actionMessage'


export const familliesLogout = () => {
    return {
        type: FAMILLY_TRASH_DATA,
    };
};

export const familliesGetter = (token) => (dispatch) => {
    dispatch({type:FAMILLY_SUBMIT});

    const config = {
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
       }
    };    
       
    axios.get(famillyUrl + "familly", config)
    .then((res) => {
        dispatch({
            type: FAMILLY_GET_INFO,
            payload:res.data
        });
    })
    .catch((err) => {
        dispatch({
            type:FAMILLY_API_ERROR,
        });
    });
};

export const famillyNew = (famillyName) => (dispatch, getState) => {
    dispatch({type:FAMILLY_SUBMIT})
    
    const config = {
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${getState().auth.token}`
       }
    };  

    const data = {
        "familly": famillyName
    };

    axios.post(famillyUrl + "familly", data, config)
    .then((res) => {
        dispatch({
            type: FAMILLY_CREATED,
            payload:res.data
        });
        dispatch(messageValid(`Famille ${famillyName} créée avec suces`))

    })
    .catch((err) => {
        dispatch(messageError("Probleme dans la création" + err))
        dispatch({
            type:FAMILLY_API_ERROR,
        });
    });
};

export const famillyDelete = (famillyName) => (dispatch, getState) => {
    let headersList = {
    "Authorization": `Token ${getState().auth.token}`,
    "Content-Type": "application/json" 
    }
       
    let reqOptions = {
        url: famillyUrl + "familly",
        method: "DELETE",
        headers: headersList,
        data: {"familly": famillyName},
    }
       
    axios.request(reqOptions).then(function (response) {
        dispatch({
            type: FAMILLY_DELETE,
            payload:response.data
        });
        dispatch(messageValid(`Famille ${famillyName} supprimée`))
    }).catch((err) => {
        dispatch(messageError("Probleme dans la supprssion" + err))
        dispatch({
            type:FAMILLY_API_ERROR,
        });
    });
};

export const famillyAddUser = (famillyName, userName) => (dispatch, getState) => {
    let headersList = {
        "Authorization": `Token ${getState().auth.token}`,
        "Content-Type": "application/json" 
        }
           
        let reqOptions = {
            url: famillyUrl + "user",
            method: "POST",
            headers: headersList,
            data: {"familly": famillyName,
            "username": userName
        },
        }
           
        axios.request(reqOptions).then(function (response) {

            dispatch({
                type: FAMILLY_ADD_USER,
                payload:response.data
            });
            if (response.status === 200){
                dispatch(messageValid(`Utilisateur ${userName} ajoutée à la famille ${famillyName}.`))
            }else if (response.status === 204){
                dispatch(messageValid(`Utilisateur ${userName} Inconnu`))
            }

        }).catch((err) => {
            dispatch(messageError("Probleme dans la supprssion" + err))
            dispatch({
                type:FAMILLY_API_ERROR,
            });
        });
};

export const famillyRemoveUser = (familly, user) => (dispatch, getState) => {
    dispatch({type:FAMILLY_SUBMIT});

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${getState().auth.token}`
           },
        data : {
            "familly" : familly,
            "username" : user
        }
    }
    axios.delete(famillyUrl + "user", config)
    .then((res) => {
        dispatch({
            type: FAMILLY_REMOVE_USER,
            payload:res.data
        });
    })
    .catch((err) => {
        dispatch(messageError(err))
        dispatch({
            type:FAMILLY_API_ERROR,
        });
    });

};