const router = require("express").Router()
const task = require("../models/Task").model

router.post("/", (req, res) => {
  const name = req.body.name
  const newTask = new task({ name })
  newTask.save()
  res.send({ newTask: name })
})

router.get("/", async (req, res) => {
  const tasks = await task.find()
  res.send(tasks)
})

module.exports = router
