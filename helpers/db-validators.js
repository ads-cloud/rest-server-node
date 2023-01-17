const Role = require("../models/role")
const Usuario = require("../models/user")
const validateRol = async (rol = "") => {
  const exitRole = await Role.findOne({ rol })
  if (!exitRole) {
    throw new Error(`El rol ${rol} no es valido`)
  }
}
const existEmail = async (correo = "") => {
  const mailExist = await Usuario.findOne({ correo })
  if (mailExist) {
    throw new Error(`El correo ${correo}, ya se encuentra registrado`)
  }
}

const existUserById = async (id) => {
  const userExist = await Usuario.findById(id)
  if (!userExist) {
    throw new Error(`El usuario que intenta modificar no existe`)
  }
}

module.exports = {
  validateRol,
  existEmail,
  existUserById,
}
