import {MESSAGE_VALID, MESSAGE_WARNING, MESSAGE_ERROR, MESSAGE_UNDISPLAY} from './type'

export const messageValid = (msg) => {
    return {
        type: MESSAGE_VALID,
        payload: msg
    };
};

export const messageWarning = (msg) => {
    return {
        type: MESSAGE_WARNING,
        payload: msg
    };
};

export const messageError = (msg) => {

    let message = '';
    let code = 0;
    try{
        if (msg.response){
            if (Object.prototype.toString.call(msg.response) === "[object Object]" ){
                message = JSON.stringify(msg.response.data)
                const regex = /{|}|[|]/g
                message = message.replace(regex, ' ')
            } else {
                message = msg.response.data
            }

            code = msg.response.status;

        }else if (msg.request){
            message = msg.request;
        }else{
            message = msg
        };
    }catch(err){

    };


    return {
        type: MESSAGE_ERROR,
        payload: {
            message: message,
            code: code,
        }
    };
};

export const messageUnDisplay = () => {
    return { 
        type: MESSAGE_UNDISPLAY
    }
}