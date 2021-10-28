const Express = require('express');
const router = Express.Router();
const { CharacterModel } = require("../models")

router.get('/practice', (req, res) => {
    res.send('Practice route!')
});

router.post('/create', async (req, res) => {
    const {name, appearance, personality, description, background} = req.body.character;

    const characterEntry = {
        name,
        appearance,
        personality,
        description,
        background
    }
    try {
        const newCharacter = await CharacterModel.create(characterEntry);
        res.status(200).json(newCharacter);
    } catch (err) {
        res.status(500).json({error: err})
    }
});

module.exports = router;
