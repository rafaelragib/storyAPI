import express from 'express';
import mongoose from 'mongoose';
import {router} from './routes/router';
//const router= require('./routes/router')

require('dotenv').config();

const app = express();
const port = 3000;
const dbURI = process.env.mongoURI;

if (typeof dbURI === 'string') {
    const connect = mongoose.connect(dbURI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    connect.then((db) => {
        console.log("connected to the database");
    }, (error) => console.log(error));
}
else {
    console.log("something wrong with the dbURI ");
}

app.use('/',router);

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}.`);
})