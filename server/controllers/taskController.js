// get tasks 
const Task = require('../models/Task')

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 })

    res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch tasks'
    })
  }
}

module.exports = {
  getTasks
}


// create task
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body)

    res.status(201).json(task)
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}

module.exports = {
  getTasks,
  createTask
}