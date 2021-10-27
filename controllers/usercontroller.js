const Express = require('express');
const router = require("express").Router();

router.get('/practice', (req, res) => {
    res.send('Practice route!')
});

module.exports = router;