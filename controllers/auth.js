const { response, json } = require("express")
const bcryptjs = require("bcryptjs")
const Usuario = require("../models/user")
const { generarJWT } = require("../helpers/generar-jwt")
const { googleVerify } = require("../helpers/google-verify")
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

const googleSingIn = async (req, res = response) => {
  const { id_token } = req.body
  try {
    const { nombre, correo } = await googleVerify(id_token)
    let usuario = await Usuario.findOne({ correo })
    if (!usuario) {
      const data = {
        nombre,
        edad: 23,
        correo,
        password: "",
        rol: "USER",
        status: true,
        google: true,
      }
      usuario = new Usuario(data)
      await usuario.save()
    }
    if (!usuario.status) {
      return res.status(401).json({
        msg: "El usuario se encuentra bloqueado",
      })
    }
    const token = await generarJWT(usuario.id)
    res.json({
      usuario,
      token,
    })
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "No se pudo verificar el token " + error,
    })
  }
}

module.exports = {
  login,
  googleSingIn,
}
