import express from 'express';
import { Createtask, taskview } from '../controllers/task.controller.js';

const router = express.Router();

router.post('/Createtask', Createtask);
router.get('/taskview',taskview);

export default router;
