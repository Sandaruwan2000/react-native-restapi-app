import express from 'express';
import { Createconditon, onecondition, Updatecodition, Viewcondition } from '../controllers/condition.controller.js';

const router = express.Router();

router.post('/Createconditon', Createconditon);
router.get('/Viewcondition/:email',Viewcondition);
router.get('/onecondition/:id',onecondition);
router.put('/Updatecodition/:id',Updatecodition);

export default router;
