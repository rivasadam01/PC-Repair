const router = require("express").Router()
const task = require("../models/Task").model

router.post("/", (req, res) => {
  const { name, weight } = req.body
  const newTask = new task({ name, weight })
  newTask.save()
  res.send({ newTask: name })
})

router.get("/", async (req, res) => {
  const tasks = await task.find()
  tasks.sort((t1, t2) => {
    if (t1.weight > t2.weight) return 1
    if (t1.weight < t2.weight) return -1
    return 0
  })
  // for (let i = 0; i < tasks.length; i++) {
  //   await task.findByIdAndUpdate(tasks[i]._id, {
  //     weight: (tasks[i].weight = i * 10),
  //   })
  // }
  // console.log(tasks)
  res.send(tasks)
})

module.exports = router
