const { response } = require("express")
const bcrypt = require("bcryptjs")
const Usuario = require("../models/user")
const Role = require("../models/role")
const { isObjectIdOrHexString } = require("mongoose")

const userGet = async (req, res = response) => {
  const { limite = 10, desde = 0 } = req.query
  const usersComplete = []
  const query = { status: true }
  const [total, users, roles] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(desde).limit(limite),
    Role.find(),
  ])
  const usu = {}
  users.forEach((user) => {
    user.userRol = roles.find((rol) => rol.ROL === user.rol)
  })

  res.json({ total, users })
}

const getUserById = async (req, res = response) => {
  const { id } = req.params
  const query = { _id: id }
  const [users, roles] = await Promise.all([Usuario.find(query), Role.find()])
  users.forEach((user) => {
    user.userRol = roles.find((rol) => rol.ROL === user.rol)
  })
  res.json({ users })
}

const userSave = async (req, res) => {
  const salt = bcrypt.genSaltSync()
  const { password } = new Usuario(req.body)
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
  try {
    const { id } = req.params
    const userDelete = await Usuario.findByIdAndUpdate(id, { status: false })
    res.json({ userDelete })
  } catch (error) {
    res.status(500).json({
      msg: "Ocurrio un error ",
    })
  }
}

module.exports = {
  userGet,
  userSave,
  userDelete,
  userUpdate,
  getUserById,
}
