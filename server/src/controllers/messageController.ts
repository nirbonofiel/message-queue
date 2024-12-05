import express from "express";
import { MessageService } from "../services/messageService";

const router = express.Router();

router.get('/queues',MessageService.getQueues);
router.post('/:queue_name',MessageService.createMessage);
router.get('/:queue_name',MessageService.getMessage);

export default router;