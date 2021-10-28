const { DataTypes } = require('sequelize');
const db = require('../db');

const Character = db.define('character', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
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
    },
    race: {
        type: DataTypes.STRING
    },
    charClass: {
        type: DataTypes.STRING
    },
    alignment: {
        type: DataTypes.STRING
    },
    campaignName: {
        type: DataTypes.STRING
    },
    owner: {
        type: DataTypes.INTEGER
    }
});

module.exports = Character;