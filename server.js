import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { readdir } from 'fs/promises';
import * as dotenv from 'dotenv';
dotenv.config();
console.log(process.env.HTTP_PORT)

console.log(`
###########################
#        AZFORMGEN        #
###########################
`);

const app = express();
// app.use( morgan('dev') );
app.use( cors( { origin: ['http://localhost:5173' , 'http://localhost:5174' ] } ));

app.use(express.urlencoded({ limit: '5mb', extended: true }));
app.use(express.json({ limit: '5mb' }));

app.use(express.static('./frontend/dist')); // server files in /frontend/dist as static html files

// log all route requests to console
app.use( (req, res, next) => {
    console.log(`App Log : ${new Date().toISOString()} , ${req.ip} , ${req.method} , ${req.url}`);
    next();
});

const startApp = async ( ) => {
    const routesPath = path.resolve('routes');
    const routeFiles = await readdir(routesPath, { recursive: true });


    for (const file of routeFiles) {    // for each file in /routes
        if (file.endsWith('.js')) {     // if file is a js file
            const routerFile = './routes/' + file.replaceAll('\\', '/');    // build path
            console.log(`Register Router File : ${routerFile}`);            // log a message
            const { default: route } = await import(routerFile);            // import route
            app.use(route); // use route
        }
    }

    // setup express error handler
    app.use(( err , req , res , next ) => {
        try {
            console.log('expres error handler' , res.headersSent);
            console.log(err.stack)
            // if (res.headersSent) return next(err);
            // resturn sql serror message or error message or unhandled exception
            res.status(500).json({ message : err.sqlMessage || err.message || 'Internal Server Error (unhandled exception) ' });
        } catch (e) {
            console.log('WTF' , e);
            return next(e); // pass error to next handler 
        }
    });

    // setup express not found handler
    app.use(( req , res , next ) => {
       console.log('# 404', req.path);
        res.status(404).json({ message: `route not found : ${req.path}` });
    });

    // listen to requests via express-app
    app.listen(process.env.HTTP_PORT, err => {
        if (err) throw err;
        console.log(`express listen on port : ${process.env.HTTP_PORT} , env : ${process.env.NODE_ENV}`);
    });
};

// load api routes dynamically and start server
startApp();
