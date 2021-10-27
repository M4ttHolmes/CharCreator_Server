const Express = require('express');
const router = Express.Router();

router.get('/practice', (req, res) => {
    res.send('User Practice route!')
});

module.exports = router;