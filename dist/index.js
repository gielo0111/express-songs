"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const port = 8080;
const app = (0, express_1.default)();
// const mongoose = require('mongoose');
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
mongoose_1.default.connect('mongodb://localhost:27017/songs', { useNewUrlParser: true });
const db = mongoose_1.default.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Databse'));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const songBookRouter = require('./router/songbook');
app.use('/songbook', songBookRouter);
// app.get("/", (req, res) => {
//     res.send("YEESSSs TS YET")
// });
app.listen(port, () => {
    console.log(`now listening to port port ${port}`);
});
