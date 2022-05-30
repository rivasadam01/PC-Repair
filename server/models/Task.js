const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
  notes: {
    type: String,
    required: false,
  },
  weight: {
    type: Number,
    required: true,
    default: 1,
  },
})

const taskModel = mongoose.model("task", taskSchema)

module.exports = { model: taskModel, schema: taskSchema }
