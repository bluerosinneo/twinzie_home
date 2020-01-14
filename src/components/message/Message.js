
import React from 'react';

function Message(props){
    return (
        <div>
            {props.text}
            <br/>
            {props.username}
            <br/>
            {props.createdAt}
        </div>
    );

}

export default Message;