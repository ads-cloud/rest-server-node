const { response } = require("express")
const bcrypt = require("bcryptjs")
const Usuario = require("../models/user")

const userGet = async (req, res = response) => {
  const { limite = 10, desde = 0 } = req.query
  const query = { status: true }
  const [total, users] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(desde).limit(limite),
  ])
  res.json({ total, users })
}

const userSave = async (req, res) => {
  const salt = bcrypt.genSaltSync()
  const { correo, password, edad, nombre } = new Usuario(req.body)
  const usuario = new Usuario(req.body)
  usuario.password = bcrypt.hashSync(password, salt)

  await usuario.save()
  res.json(usuario)
}

const userUpdate = async (req, res) => {
  const { id } = req.params
  const { _id, password, correo, ...resto } = req.body
  const userUpdate = await Usuario.findByIdAndUpdate(id, resto)
  res.json(userUpdate)
}

const userDelete = async (req, res) => {
  const { id } = req.params
  const userDelete = await Usuario.findByIdAndUpdate(id, { status: false })
  res.json(userDelete)
}

module.exports = {
  userGet,
  userSave,
  userDelete,
  userUpdate,
}
