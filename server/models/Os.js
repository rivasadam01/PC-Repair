const mongoose = require("mongoose")

const osSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "Windows 10",
  },
})

const osModel = mongoose.model("os", osSchema)

module.exports = { schema: osSchema, model: osModel }
