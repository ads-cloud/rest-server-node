const { response } = require("express")
const bcryptjs = require("bcryptjs")
const Usuario = require("../models/user")
const { generarJWT } = require("../helpers/generar-jwt")
const login = async (req, res = response) => {
  const { correo, password } = req.body
  try {
    const usuario = await Usuario.findOne({ correo })
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario o password son incorrectos",
      })
    }
    if (!usuario.status) {
      return res.status(400).json({
        msg: "Acceso denegado",
      })
    }
    const validPasswor = bcryptjs.compareSync(password, usuario.password)
    if (!validPasswor) {
      return res.status(400).json({
        msg: "Usuario o password son incorrectos pass",
      })
    }
    const token = await generarJWT(usuario.id)

    res.status(200).json({
      usuario,
      token,
    })
  } catch (error) {
    res.status(500).json({
      msg: error,
    })
  }
}

module.exports = {
  login,
}
