"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const Song = require('../models/song');
//Getting ALL
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const songs = yield Song.find();
        res.json(songs);
    }
    catch (err) {
        res.status(200).json({ message: err.message });
    }
}));
//Getting One
router.get('/:id', getSong, (req, res) => {
    res.send(res.song.title);
});
//Creating One
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const song = new Song({
        title: req.body.title,
        artist: req.body.artist,
        lyrics: req.body.lyrics
    });
    try {
        const newSong = yield song.save();
        res.status(201).json(newSong);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
//Updating One
router.patch('/:id', getSong, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.song.title = req.body.title !== undefined ? req.body.title : res.song.title;
    res.song.artist = req.body.artist !== undefined ? req.body.artist : res.song.artist;
    res.song.lyrics = req.body.lyrics !== undefined ? req.body.lyrics : res.song.lyrics;
    try {
        const updatedSong = yield res.song.save();
        res.json(updatedSong);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
//Deleting One
router.delete('/:id', getSong, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield res.song.deleteOne();
        res.json({ message: 'Song Deleted' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
function getSong(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let song;
        try {
            song = yield Song.findById(req.params.id);
            if (song === null) {
                return res.status(404).json({ message: 'Cannot find Song' });
            }
        }
        catch (err) {
            return res.status(404).json({ message: 'Cannot find song' });
        }
        res.song = song;
        next();
    });
}
module.exports = router;
