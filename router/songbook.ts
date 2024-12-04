import express from 'express';
const router = express.Router();
const Song = require('../models/song');

//Getting ALL
router.get('/', async (req: any, res:any) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    }catch (err:any) {
        res.status(200).json({message: err.message})
    }
})

//Getting One
router.get('/:id', getSong, (req: any, res:any) => {
    res.send(res.song.title)
})

//Creating One
router.post('/', async (req: any, res:any) => {
    const song = new Song({
        title: req.body.title,
        artist: req.body.artist,
        lyrics: req.body.lyrics
    })
    try {
        const newSong = await song.save()
        res.status(201).json(newSong)
    } catch (err:any) {
        res.status(400).json({ message: err.message})
    }
})

//Updating One
router.patch('/:id', getSong, async (req: any, res:any) => {
    res.song.title =  req.body.title !== undefined ? req.body.title: res.song.title
    res.song.artist =  req.body.artist !== undefined ? req.body.artist: res.song.artist
    res.song.lyrics =  req.body.lyrics !== undefined ? req.body.lyrics: res.song.lyrics

    try {
        const updatedSong = await res.song.save()
        res.json(updatedSong)
    } catch (err:any) {
        res.status(400).json({message: err.message })
    }
})


//Deleting One
router.delete('/:id', getSong, async (req: any, res:any) => {
    try {
        await res.song.deleteOne()
        res.json({message: 'Song Deleted'})
    }catch (err:any) {
        res.status(500).json({ message: err.message})
    }
})

async function getSong(req:any, res:any, next:any) {
    let song:any
    try {
        song = await Song.findById(req.params.id)
        if(song === null){
            return res.status(404).json({ message: 'Cannot find Song'})
        }
    } catch (err:any) {
        return res.status(404).json({ message: 'Cannot find song'})
    }
    res.song = song
    next();
}






module.exports = router