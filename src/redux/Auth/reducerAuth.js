import { USER_AUTH_SUBMIT, 
    USER_AUTH_ERROR, 
    USER_AUTH_SUCCESS, 
    USER_AUTH_LOGOUT, 
    USER_AUTH_UNKNOW, 
    USER_AUTH_REGISTER,
    USER_AUTH_KNOW,
    USER_AUTH_UPDATED,
    USER_UPDATE_FAIL,
    USER_CHANGE_PWD} from "./type";


const initialStateComments = {
    isloading: false,
    username : '',
    identifiant: null,
    firstname : '',
    lastname: '',
    birth: null,
    email: '',
    isAuthenticated: false,
    token: localStorage.getItem('account-token')
}

/*
 * 
 */
const authReducer = (state=initialStateComments, action) => {
    switch(action.type) {
        case USER_AUTH_SUBMIT:
            return {
                ...state,
                isloading: true
            };
        
        case USER_UPDATE_FAIL:
        case USER_CHANGE_PWD:
            return {
                ...state,
                isloading: false
            };

            
        case USER_AUTH_SUCCESS:
        case USER_AUTH_REGISTER:
        case USER_AUTH_KNOW:
        case USER_AUTH_UPDATED:
            localStorage.setItem('account-token', action.payload.token)
            return {
                ...state,
                isloading: false,
                isAuthenticated: true,
                token : action.payload.token,
                identifiant : action.payload.identifiant,
                username: action.payload.username,
                firstname : action.payload.firstname,
                lastname: action.payload.lastname,
                birth: action.payload.birth,
                email: action.payload.email,
            };   

        case USER_AUTH_ERROR:
        case USER_AUTH_LOGOUT:
        case USER_AUTH_UNKNOW:
            localStorage.removeItem('account-token')
            return {
                ...state,
                isloading: false,
                isAuthenticated: false,
                identifiant: null,
                username:'',
                token: '',
                firstname : '',
                lastname: '',
                birth: null,
                email: '',
            }; 
        
        default: return state;
    }
}


export default  authReducer;