const Sequelize = require('sequelize');
const db = require('../db');

const Task = db.define("task", {

    task: {
        type: Sequelize.STRING,
        allowNull: false
    },

    description: {
        type: Sequelize.STRING
    },

    priority: {
        type: Sequelize.STRING
    },

    completion: {
        type: Sequelize.STRING
    },
});

module.exports = Task;