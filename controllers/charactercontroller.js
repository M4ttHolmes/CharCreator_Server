const Express = require('express');
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const { CharacterModel } = require("../models")

router.post('/create', validateJWT, async (req, res) => {
    const {name, appearance, personality, description, background} = req.body.character;
    const {id} = req.user;
    const characterEntry = {
        name,
        appearance,
        personality,
        description,
        background,
        owner: id
    }
    try {
        const newCharacter = await CharacterModel.create(characterEntry);
        res.status(200).json(newCharacter);
    } catch (err) {
        res.status(500).json({error: err})
    }
});

router.put("/update/:id", validateJWT, async(req, res) => {
    const {name, appearance, personality, description, background} = req.body.character;
    const characterId = req.params.id;
    const userId = req.user.id;

    const query = {
        where: {
            id: characterId,
            owner: userId,
        }
    };

    const updatedCharacter = {
        name: name,
        appearance: appearance,
        personality: personality,
        description: description,
        background: background
    };

    try {
        const update = await CharacterModel.update(updatedCharacter, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({error: err});
    }
});



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
router.get("/mine", validateJWT, async (req, res) => {
    let { id } = req.user;
    try {
        const userCharacters = await CharacterModel.findAll({
            where: {
                owner: id
            }
        });
            res.status(200).json(userCharacters);
        } catch (err) {
            res.status(500).json({ error: err });
        }
});

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
router.delete("/:id", validateJWT, async (req, res) => {
    const ownerId = req.user.id;
    const charId = req.params.id;

    try {
        const query = {
            where: {
                id: charId,
                owner: ownerId
            }
        };
        await CharacterModel.destroy(query);
        res.status(200).json({ message: "Character Deleted."});
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;
