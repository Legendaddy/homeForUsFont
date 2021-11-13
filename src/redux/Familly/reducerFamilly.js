
import { FAMILLY_API_ERROR, FAMILLY_GET_INFO, FAMILLY_SUBMIT, FAMILLY_TRASH_DATA, FAMILLY_DELETE, FAMILLY_CREATED, FAMILLY_REMOVE_USER, FAMILLY_ADD_USER } from "./type";

const initialStateFamilly = {
    isLoading: false,
    famillies: {}
};

/*
 *
 */
const famillyReducer = (state=initialStateFamilly, action) => {
    switch(action.type) {
        case FAMILLY_SUBMIT:
            return { 
                ...state,
                isLoading: true
            };
        case FAMILLY_GET_INFO:
        case FAMILLY_CREATED:
        case FAMILLY_ADD_USER:
        case FAMILLY_REMOVE_USER:
        case FAMILLY_DELETE:
            return {
                ...state,
                isLoading: false,
                famillies: action.payload
            };
        case FAMILLY_API_ERROR:
            return {
                ...state,
                isLoading: false
                
            };
        case FAMILLY_TRASH_DATA:
            return {
                isLoading: false,
                famillies : null,
            }
        default: return state;
    }
};


export default famillyReducer;