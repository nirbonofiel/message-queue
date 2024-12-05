import { Request, Response } from "express";
import { queues } from "../constants";

export class MessageService {
    static getQueues(req: Request, res: Response) {
        try {
            const respose = Object.keys(queues).map((name)=>({
                name,
                amount: queues[name].length
            }));
            res.json(respose);
        } catch (error){
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static createMessage(req: Request, res: Response){
        try{
            const {queue_name} = req.params;
            const {message} = req.body; 
            if(!queues[queue_name]){
                res.status(404).json({message:'Queue not exist'})
            }
            queues[queue_name].push(message);
            res.status(201).send();
        } catch(error){
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static getMessage(req: Request, res: Response){
        try{

            const {queue_name} = req.params;
            const timeout = req.query.timeout? parseInt(req.query.timeout as string, 10) : 10000
            if(!queues[queue_name]){
                res.status(404).json({message:'Queue not exist'})
            }

            if (queues[queue_name].length > 0) {
                return res.send({ message: queues[queue_name].shift() });
            }

            const timer = setTimeout(() => {
                res.status(204).send(); 
            }, timeout);

            const interval = setInterval(()=>{
                if(queues[queue_name].length > 0){
                    clearTimeout(timer);
                    clearInterval(interval);
                    return res.send({ message: queues[queue_name].shift() });
                }
            },100) 

        }catch(error){
            res.status(500).json({ error: 'Internal Server Error' });
        }

    }
}
