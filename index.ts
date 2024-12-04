
import express from 'express';
const port = 8080;
const app = express();
// const mongoose = require('mongoose');
import mongoose, { ConnectOptions } from 'mongoose';
import cors from 'cors';
mongoose.connect('mongodb://localhost:27017/songs', 
    { useNewUrlParser: true} as ConnectOptions)
const db = mongoose.connection;
db.on('error', (error:any) => console.error(error));
db.once('open', () => console.log('Connected to Databse'))

app.use(cors())
app.use(express.json());

const songBookRouter = require('./router/songbook')
app.use('/songbook', songBookRouter)

// app.get("/", (req, res) => {
//     res.send("YEESSSs TS YET")
// });

app.listen(port, () => {
    console.log(`now listening to port port ${port}`);
})