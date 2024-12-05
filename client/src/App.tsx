import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { createMessage, getMessage, getQueues } from './api/apiAction';
import { QueueData } from './types/types';
import Queue from './components/QueueList/QueueList';
import PostMessage from './components/PostMessage/PostMessage';
import { Button, ButtonProps, styled } from '@mui/material';

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  marginTop: '20px',
  color: '#003246',
  backgroundColor: 'fff',
  '&:hover': {
    border: 'solid #003246 0.5px',
    boxShadow: '13px 15px 22.5px #ff005d1a'
  },
}));

function App() {
  const [queues, setQueues] = useState<QueueData[]>();
  const [currentQueue, setCurrnetQueue] = useState<string>('');
  const [queueMessage, setQueueMessage] = useState<string>('');

  useEffect(() => {
    fetchQueues();
  }, [])

  const fetchQueues = async () => {
    const response = await getQueues('/queues');
    setQueues(response);
  };

  const handleCreateMessage = async(message: string) => {
    await createMessage(currentQueue, message)
    fetchQueues();
  }

  const handlefetchMessage = async (queueName:string) => {
    const response = await getMessage(queueName);
    if (response?.status === 204) {
      setQueueMessage(`No messages in ${queueName}`)
    } else {
      setQueueMessage(response?.data.message)
    }
    fetchQueues();
  }

  const handleQueueCliked = useCallback((name: string) => {
    setCurrnetQueue(name);
  }, []);

  return (
    <div className="App">
      <PostMessage queueName={currentQueue} handleCreateMessage={handleCreateMessage} />
      <Queue queues={queues} handleQueueCliked={handleQueueCliked} />
      <ColorButton disabled={!currentQueue} onClick={()=>handlefetchMessage(currentQueue)}>Go</ColorButton>
      {queueMessage && <p>{queueMessage}</p>}
    </div>
  );
}

export default App;
