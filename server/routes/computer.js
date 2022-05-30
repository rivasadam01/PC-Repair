const router = require("express").Router()
const Computer = require("../models/Computer").model
const Task = require("../models/Task").model

router.get("/", async (req, res) => {
  const computers = await Computer.find()
  res.send(computers)
})

router.post("/", async (req, res) => {
  const { serviceOrder, name, tasks } = req.body
  if (!serviceOrder || !name)
    return res.status(400).send({ error: "SO or name cannot be empty" })
  const newComputer = new Computer({
    serviceOrder,
    name,
  })

  if (tasks.length === 0)
    return res.status(400).send({ error: "No tasks for new pc!" })

  const getTasks = new Promise((resolve, reject) => {
    const totalTasks = tasks.length

    tasks.forEach(async (task) => {
      const taskDb = await Task.findById(task.id)
      if (!taskDb)
        return reject({ error: `Task ID(${task.id}) does not exist!` })
      newComputer.tasks.push(
        new Task({
          name: taskDb.name,
          notes: task.notes || null,
          weight: taskDb.weight,
        })
      )
      if (newComputer.tasks.length === totalTasks) resolve()
    })
  })
  getTasks
    .then(() => {
      newComputer.save()
      res.send(newComputer)
    })
    .catch((e) => res.status(400).send(e))
})

module.exports = router
