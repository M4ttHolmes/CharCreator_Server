const { DataTypes } = require('sequelize');
const db = require('../db');

const Character = db.define('character', {
    name: {
        type: DataTypes.STRING,
        //allowNull: false
    },
    appearance: {
        type: DataTypes.STRING
    },
    personality: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    background: {
        type: DataTypes.STRING
    }
});

module.exports = Character;