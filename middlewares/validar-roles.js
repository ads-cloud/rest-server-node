const { request, response } = require("express")
const Role = require("../models/role")

const validateRolAction = async (req = request, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: "No existe usuario para validar el rol",
    })
  }

  const executedAction = req.actionUser
  if (!executedAction) {
    return res.status(401).json({
      msg: "No se ha enviado la acción de la petición ",
    })
  }
  const ROL = await Role.find({ ROL: req.usuario.rol })
  const actions = ROL[0].PERMISSION
  let authorize = false
  actions.forEach((action) => {
    if (action == executedAction) {
      authorize = true
    }
  })
  if (!authorize) {
    return res.status(401).json({
      msg: "No cuenta con los permisos suficientes para realizar esta acción ",
    })
  }

  next()
}
module.exports = {
  validateRolAction,
}
