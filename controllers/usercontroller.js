const Express = require('express');
const router = Express.Router();

router.post('/signup', async (req, res) => {
    UserModel.create({
        email: "user@email.com",
        password: "password1234",
        firstName: "Billy",
        lastName: "Badbutt"
    })
});

module.exports = router;