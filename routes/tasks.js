const express = require('express');
const router = express.Router();
const { Task, Employee } = require('../database/models');
const ash = require('express-async-handler');

/** GET ALL TASKS */
router.get('/', ash(async(req, res) => {
    let tasks = await Task.findAll();
    res.status(200).json(tasks);
}));

/** GET TASK BY ID */
router.get('/:id', ash(async(req, res) => {
    let task = await Task.findByPk(req.params.id, {include: [Employee]});
    res.status(200).json(task);
}));

module.exports = router;