const validateFields = require("../middlewares/validate fields")
const validateJWT = require("../middlewares/validar-jwt")
const validateRolAction = require("../middlewares/validar-roles")

module.exports = {
  ...validateFields,
  ...validateJWT,
  ...validateRolAction,
}
