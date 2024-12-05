import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { QueueData } from '../../types/types';
import "./styles.css";


type QueueProps = {
    queues?: QueueData[];
    handleQueueCliked: (name:string) => void
}

const QueueList: React.FC<QueueProps> = React.memo(({ queues,handleQueueCliked }) => {

    if (!queues) return null;

    return (
        <Stack direction="row" spacing={1} justifyContent='center' marginTop={10}>
            {queues.map((queue) => 
            <Box sx={{
                padding:'10px',
                height: 200,
                bgcolor: '#fff',
                borderRadius: 1,
                '&:hover': {
                  boxShadow: '13px 15px 22.5px #ff005d1a',
                },
              }} key={queue.name}
              >
                <div onClick={()=>handleQueueCliked(queue.name)} className='queueWrapper'>
                <Typography variant='h3' >{queue.name}</Typography>
                <Typography variant='body2'>amount:{queue.amount}</Typography>
                </div>
            </Box>
            )}
        </Stack>
    );
});

export default QueueList;