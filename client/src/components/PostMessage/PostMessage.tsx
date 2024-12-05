import  { useState } from 'react';
import { Button, TextField } from '@mui/material';
import React from 'react';

type PostMessageProps = {
    queueName: string;
    handleCreateMessage: (message:string) => void;
}

const PostMessage: React.FC<PostMessageProps> = React.memo(({queueName,handleCreateMessage}) => {

    const [message, setMessage] = useState('');

    const handlePostMessage = () => {
        setMessage('');
        handleCreateMessage(message);
    }

    const handleSetValue = (e: any) => {
        setMessage(e.target.value);
    }

    return (
        <div style={{marginTop:20}}>
             <TextField disabled={!queueName} id="outlined-basic"  value={message} placeholder='Post New Message' onChange={handleSetValue}/>
             <Button disabled={!queueName || !message} variant="outlined" color="primary" onClick={handlePostMessage} style={{ height: '56px',backgroundColor:'fff'}}>Post</Button>
        </div>
    );
 }); 

 export default PostMessage;