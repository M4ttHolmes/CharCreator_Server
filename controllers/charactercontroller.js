const Express = require('express');
const router = Express.Router();
const { CharacterModel } = require("../models")

router.get('/practice', (req, res) => {
    res.send('Practice route!')
});

module.exports = router;
