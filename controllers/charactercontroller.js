const Express = require('express');
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const { CharacterModel } = require("../models")

// IRVIN'S ENDPOINT
router.post('/create', validateJWT, async (req, res) => {
    const {name, appearance, personality, description, background, race, charClass, alignment, campaignName} = req.body.character;
    const {id} = req.user;
    const characterEntry = {
        name,
        appearance,
        personality,
        description,
        background,
        race,
        charClass,
        alignment,
        campaignName,
        owner: id
    }
    try {
        const newCharacter = await CharacterModel.create(characterEntry);
        res.status(200).json(newCharacter);
    } catch (err) {
        res.status(500).json({error: err})
    }
});

// IRVIN'S ENDPOINT
router.put("/update/:id", validateJWT, async(req, res) => {
    const {name, appearance, personality, description, background, race, charClass, alignment, campaignName} = req.body.character;
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
        background: background,
        race: race,
        charClass: charClass,
        alignment: alignment,
        campaignName: campaignName
    };

    try {
        const update = await CharacterModel.update(updatedCharacter, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({error: err});
    }
});


// MATT'S ENDPOINT
//* GET ALL CHARACTERS
router.get("/", async (req, res) => {
    try {
        const chars = await CharacterModel.findAll();
        res.status(200).json(chars);
    } catch (err) {
        res.status(500).json({ error: err });
    }
    });

// MATT'S ENDPOINT
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

// MATT'S ENDPOINT
//* GET CHARACTER BY CAMPAIGN NAME
router.get("/:campaignName", async (req, res) => {
    const { campaignName } = req.params;
    try {
        const results = await CharacterModel.findAll({
            where: { campaignName: campaignName }
        });
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// MATT'S ENDPOINT
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
