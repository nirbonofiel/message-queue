import axiosInstance from './axiosInstanse';

export const getQueues = async(path: string) => {
    try{
        const res = await axiosInstance.get(path);
        return res.data;
    }catch (error){
        console.error('Error:', error);
    }
}

export const createMessage = async(queueName: string,message:string) => {
    try{
        await axiosInstance.post(queueName,{message});
    }catch (error){
        console.error('Error:', error);
    }
}

export const getMessage = async(queueName: string) => {
    try{
        const res = await axiosInstance.get(queueName);
        return res;
    }catch (error){
        console.error('Error:', error);
    }
}

