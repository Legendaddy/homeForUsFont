import axios from "axios";
import {authApiUrl} from '../../config'
import { USER_AUTH_SUBMIT, 
    USER_AUTH_ERROR, 
    USER_AUTH_SUCCESS,
    USER_AUTH_KNOW,
    USER_AUTH_UNKNOW, 
    USER_AUTH_REGISTER,
    USER_AUTH_LOGOUT,
    USER_AUTH_UPDATED,
    USER_UPDATE_FAIL,
    USER_CHANGE_PWD
    } from "./type";

import {messageError, messageValid} from '../Message/actionMessage'
import { familliesGetter } from "../Familly/actionFamilly";

export const submit = () => {
    return {
        type : USER_AUTH_SUBMIT
    };
};

export const userAuthSuccess = response => {
    return {
        type: USER_AUTH_SUCCESS,
        payload: response
    };
};

export const userAuthError = error => {
    return {
        type: USER_AUTH_ERROR,
        payload: error
    };
};

export const userAuthUnknow = () => {
    return {
        type: USER_AUTH_UNKNOW
    };
};

export const userKnow = () => {
    return {
        type: USER_AUTH_KNOW
    }
}

/*
 * LOGIN
 */
export const userLogin = (username, password) => (dispatch) => {
  // Headers
  dispatch({type:USER_AUTH_SUBMIT});
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Body
  const body = JSON.stringify({ username, password });

  axios.post(authApiUrl + "login", body, config)
  .then((res) => {
      dispatch({
          type: USER_AUTH_SUCCESS,
          payload: {
              token: res.data.token,
              username: res.data.user.username,
              identifiant: res.data.user.id,
              firstname: res.data.user.first_name,
              lastname: res.data.user.last_name,
              birth: res.data.user.date_of_birth,
              email: res.data.user.email
          }
      });
      dispatch(familliesGetter(res.data.token));
  })
  .catch((err) => {
    dispatch(messageError(err))
    dispatch({
        type:USER_AUTH_ERROR,
    });
  });
};


/*
 * CHECK USER 
 */
export const userCheck = (token) => (dispatch) => {
    dispatch({type:USER_AUTH_SUBMIT});
    
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
    };
    
    axios.get(authApiUrl + "user", config)
    .then((res) => {
        dispatch({
            type: USER_AUTH_KNOW,
            payload: {
                token: token,
                username: res.data.username,
                identifiant: res.data.id,
                firstname: res.data.first_name,
                lastname: res.data.last_name,
                birth: res.data.date_of_birth,
                email: res.data.email
            }
        });
        dispatch(familliesGetter(token));
    })
    .catch((err) => {
        dispatch({
            type:USER_AUTH_UNKNOW,
        });
    });
};


/*
 * NEW USER
 */
export const userRegister = (username, email, password, password2) => (dispatch) => {
    dispatch({type:USER_AUTH_SUBMIT});

    if(password !== password2){
        dispatch({
            type: USER_AUTH_ERROR
        })
    }
    else
    {
        // Headers
        const config = {
            headers: {
            'Content-Type': 'application/json',
            },
        };

        // Request Body
        email = email.toLowerCase()
        const body = JSON.stringify({ username, email, password });

        axios.post(authApiUrl + "register", body, config)
        .then((res) => {
            dispatch(messageValid("Compte crée avec success!!"))
            dispatch({
                type: USER_AUTH_REGISTER,
                payload: {
                    token: res.data.token,
                    username: res.data.user.username
                }
            });
            dispatch(familliesGetter(res.data.token));
        })
        .catch((err) => {
            dispatch({
                type:USER_AUTH_UNKNOW,
            });
        });
    }
};


/*
 * USER LOGOUT
 */
export const userLogout = () => (dispatch, getState) => {

    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${getState().auth.token}`
        },
      };

    axios
      .post(authApiUrl + 'logout/', null, config)
      .then((res) => {
        dispatch(messageValid(`Good bye ${getState().auth.username}`))
        dispatch({
          type: USER_AUTH_LOGOUT,
        });
      })
      .catch((err) => {
        dispatch(messageError(err));
      });
  };


/*
 * USER UPDATE
 */
export const userUpdateProfil = (firstName, lastName, email, birthDate) => (dispatch, getState) => {
    dispatch({type:USER_AUTH_SUBMIT})

    const config = {
        headers:{
        'Content-Type': 'application/json',
        'Authorization': `Token ${getState().auth.token}`
        }
    }

    const body = {
        "username": getState().auth.username,
        "first_name" : firstName,
        "last_name" : lastName,
        "email" : email.toLowerCase(),
        "date_of_birth": birthDate
    };
    
    axios.put(authApiUrl + 'update-user', body, config)
    .then((res) => {
        dispatch({
            type: USER_AUTH_UPDATED,
            payload: {
                token: getState().auth.token,
                username: res.data.username,
                identifiant: res.data.id,
                firstname: res.data.first_name,
                lastname: res.data.last_name,
                birth: res.data.date_of_birth,
                email: res.data.email
            }
        });
        dispatch(messageValid(`Profil mis à jour`))
    })
    .catch((err) => {
        dispatch({type: USER_UPDATE_FAIL});
        dispatch(messageError(err));
    });
};

/*
 * USER MODIFY PWD
 */

export const userUpdatePwd = (old_password, password, password2) => (dispatch, getState) => {
    dispatch({type:USER_AUTH_SUBMIT})

    const config = {
        headers:{
        'Content-Type': 'application/json',
        'Authorization': `Token ${getState().auth.token}`
        }
    }

    const body = JSON.stringify({ old_password, password, password2 });
    
    axios.put(`${authApiUrl}change-password/${getState().auth.identifiant}/`, body, config)
    .then((res) => {
        dispatch({type: USER_CHANGE_PWD})
        dispatch(messageValid(`Password mis à jour`))
    })
    .catch((err) => {
        dispatch({type: USER_UPDATE_FAIL});
        dispatch(messageError(err));
    });


}


/*
 * USER REQUEST NEW PWD
 */