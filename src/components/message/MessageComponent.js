import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { messageUnDisplay } from '../../redux/Message/actionMessage';

function MessageComponent() {

    const messageData = useSelector(state => state.message)
    const messagelevel = useSelector(state => state.message.level)

    const [styleMessage, setStyleMessage] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        if (messagelevel === "ERROR"){
            setStyleMessage("alert alert-danger alert-dismissible fade show");
        }else if (messagelevel === "WARNING"){
            setStyleMessage( "alert alert-warning alert-dismissible fade show");
        }else if (messagelevel === "VALID"){
            setStyleMessage( "alert alert-success alert-dismissible fade show ");
        }else {
            setStyleMessage( "alert alert-info alert-dismissible fade show");
        }
    }, [messagelevel]);

    const unDisplay = (e) => {
        e.preventDefault()
        dispatch(messageUnDisplay())
    };

    return (
        <div className="message">                                                                                                                       
            <div className={styleMessage} >
                <div className="row flex justify-content-between align-items-center" >
                    <div>
                        {(messagelevel === "ERROR") && <strong>{messageData.status_code}</strong>}{messageData.message}
                    </div>
                    <button type="button" className="btn" > <FontAwesomeIcon icon={faWindowClose} color="#333" size="2x" onClick={unDisplay}/></button>
                </div>
                
                
            </div>
        </div>
    );
};

export default MessageComponent;
