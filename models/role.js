const { Schema, model } = require("mongoose")

const RoleSchema = Schema({
  ROL: {
    type: String,
  },
  PERMISSION: {
    type: Array,
  },
  MODULES: {
    type: Array,
  },
})

module.exports = model("Role", RoleSchema)
