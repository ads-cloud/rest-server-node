const Role = require("../models/role")
const Usuario = require("../models/user")

const validateRol = async (ROL = "") => {
  const exitRole = await Role.findOne({ ROL })
  if (!exitRole) {
    throw new Error(`El rol ${ROL} no es valido`)
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

const userInactive = async (id) => {
  const { status } = await Usuario.findById(id)
  if (!status) {
    throw new Error(`El ya usuario se encuentra inactivo`)
  }
}

module.exports = {
  validateRol,
  existEmail,
  existUserById,
  userInactive,
}
