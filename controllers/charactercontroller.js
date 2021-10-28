const Express = require('express');
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const { CharacterModel } = require("../models")













































//* GET ALL CHARACTERS
router.get("/", async (req, res) => {
    try {
        const chars = await CharacterModel.findAll();
        res.status(200).json(chars);
    } catch (err) {
        res.status(500).json({ error: err });
    }
    });

    
//* GET CHARACTER BY USER
//! Can't run until validateJWT is working
// router.get("/mine", validateJWT, async (req, res) => {
//     let { id } = req.user;
//     try {
//         const userCharacters = await CharacterModel.findAll({
//             where: {
//                 owner: id
//             }
//         });
//             res.status(200).json(userCharacters);
//         } catch (err) {
//             res.status(500).json({ error: err });
//         }
// });

//* GET CHARACTER BY NAME
router.get("/:name", async (req, res) => {
    const { name } = req.params;
    try {
        const results = await CharacterModel.findAll({
            where: { name: name }
        });
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//* DELETE CHARACTER BY ID
//! Can't run until validateJWT is working
// router.delete("/:id", validateJWT, async (req, res) => {
//     const ownerId = req.user.id;
//     const logId = req.params.id;

//     try {
//         const query = {
//             where: {
//                 id: logId,
//                 owner: ownerId
//             }
//         };
//         await CharacterModel.destroy(query);
//         res.status(200).json({ message: "Character Deleted."});
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }
// });

module.exports = router;
