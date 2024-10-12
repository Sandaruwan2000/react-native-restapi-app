import express from 'express';
import { Createnotification, deletenotification, Notificationview } from '../controllers/notification.controller.js';

const router = express.Router();

router.post('/Createnotification', Createnotification);
router.get('/Notificationview/:email',Notificationview);
router.delete('/deletenotification/:id',deletenotification);

export default router;
