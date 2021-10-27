const Express = require('express');
const router = Express.Router();

router.post('/register', async (req, res) => {

    UserModel.create({
        email: "user@email.com",
        password: "password",
        firstName: "Billy",
        lastName: "Badbutt"
    })
})

module.exports = router;