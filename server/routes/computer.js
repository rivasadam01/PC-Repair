const router = require("express").Router()
const Computer = require("../models/Computer").model
const Task = require("../models/Task").model

router.get("/", async (req, res) => {
  const computers = await Computer.find()
  res.send(computers)
})

router.post("/", async (req, res) => {
  console.log(req.body)
  const { serviceOrder, name, tasks } = req.body
  const newComputer = new Computer({
    serviceOrder,
    name,
  })
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
    .catch(() => res.status(400).send({ error: "Error creating computer" }))
})

module.exports = router
