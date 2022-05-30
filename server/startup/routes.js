const express = require("express")
const cors = require("cors")
const computer = require("../routes/computer")
const task = require("../routes/task")
const os = require("../routes/os")

module.exports = (app) => {
  app.use(cors())
  app.use(express.json())
  app.use("/computer", computer)
  app.use("/task", task)
  app.use("/os", os)
}
