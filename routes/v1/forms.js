import { Router } from 'express';
const router = Router();
import db from '../../db.js';

/*
forms : 
    id
    formName
    isActive
    targetTable
*/

// return a list of all forms in database 
router.get('/api/v1/forms' , async ( req , res ) => {
    console.log('api/v1/forms');
    let result = await db('forms');
    res.json( result );
});


// insert a new form into database 
router.post('/api/v1/forms' , async ( req , res ) => {
    let { formName, isActive, targetTable } = req.body;
    let result = await db('forms').insert({ formName, isActive, targetTable });
    res.json( result );
});




export default router;
