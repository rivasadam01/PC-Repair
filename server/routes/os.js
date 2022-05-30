const router = require("express").Router()
const Os = require("../models/Os").model

router.get("/", async (req, res) => {
  const oses = await Os.find()
  res.send(oses)
})

router.post("/", (req, res) => {
  const { name } = req.body
  const newOs = new Os({
    name,
  })
  newOs.save()
  res.send(newOs)
})

module.exports = router
