import React from 'react'
import { useSelector } from 'react-redux';
import MessageComponent from './MessageComponent';

function MessageContainer() {
	const display = useSelector(state => state.message.display)

    const message = display && <MessageComponent/>

    return (
        <>
            {message}
        </>
    );
};

export default MessageContainer;
