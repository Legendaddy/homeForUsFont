import {MESSAGE_VALID, MESSAGE_WARNING, MESSAGE_ERROR, MESSAGE_UNDISPLAY} from './type'

const initialStateMessage = {
    level:'',
    message:'',
    display: false,
    code: 0
}

const messageReducer = (state=initialStateMessage, action) => {
    switch(action.type) {
        case MESSAGE_VALID:
            return {
                ...state,
                level: 'VALID',
                message: action.payload,
                display: true,
                code: 0
            }
        case MESSAGE_WARNING:
            return {
                ...state,
                level: 'WARNING',
                message: action.payload,
                display: true,
                code: 0
            }
        case MESSAGE_ERROR:
            return {
                ...state,
                level: 'ERROR',
                message: action.payload.message,
                display: true,
                code: action.payload.code
            }
        case MESSAGE_UNDISPLAY:
            return {
                ...state,
                level: '',
                message: '',
                display: false
            }

        default: return state;
    }
};

export default messageReducer;