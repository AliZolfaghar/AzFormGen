import { Router } from 'express';
const router = Router();
import db from '../../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

router.post('/api/v1/auth' , async ( req , res ) => {
    // login user 
    let { email , password } = req.body ; 

    // get user from database
    const user = await db('users').where({ email }).first(); 
    // console.log('User found:', user);

    if (!user) {
        return res.status(401).json({ message : 'Unauthorized' });
    }

    // compare passwords
    if (!bcrypt.compareSync(password , user.password)) {
        return res.status(401).json({ message : 'Unauthorized' });
    }

    // generate token
    const token = jwt.sign(
        { 
            id: user.id
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.json({ token });

    // throw new Error("Foo Bar Error !!! ")

});

export default router;
