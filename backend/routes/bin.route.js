import express from 'express';
import { Binview, Createbin, deletebin, onebin, updatebin } from '../controllers/bin.controller.js';

const router = express.Router();

router.post('/Createbin', Createbin);
router.get('/Binview/:email',Binview);
router.get('/onebin/:id',onebin);
router.put('/updatebin/:id',updatebin);
router.delete('/deletebin/:id',deletebin);

export default router;
