const { response, request } = require("express")
const jwt = require("jsonwebtoken")
const Usuario = require("../models/user")

const validateJWT = async (req = request, res = response, next) => {
  try {
    const token = req.header("x-token")
    req.actionUser = req.header("x-action")

    if (!token) {
      return res.status(401).json({
        msg: "No se encontro el token en la petición",
      })
    }
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
    const usuario = await Usuario.findById(uid)
    if (!usuario) {
      return res.status(401).json({
        msg: "Usuario no autorizado",
      })
    }
    if (!usuario.status) {
      return res.status(401).json({
        msg: "Usuario no autorizado",
      })
    }
    req.usuario = usuario
    next()
  } catch (error) {
    res.status(401).json({
      msg: "El token no es valido",
    })
  }
}

module.exports = {
  validateJWT,
}
