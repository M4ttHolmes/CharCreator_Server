const { DataTypes } = require("sequelize");
const db = require("../db");

const User = db.define("user", {
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = User;