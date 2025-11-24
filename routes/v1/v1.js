import { Router } from 'express';
const router = Router();
import db from '../../db.js';

router.all('/api/v1', ( req , res ) => {
    console.log('api/v1');
    res.json({ success : true , message : 'api is up and running', version : 1 , ip : req.ip , method : req.method });
});

export default router;
