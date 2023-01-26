const { Schema, model } = require("mongoose")

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es requerido"],
  },
  correo: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  edad: {
    type: Number,
    required: [true, "La edad es obligatorio"],
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  rol: {
    required: true,
    type: String,
  },
  status: {
    type: Boolean,
    required: [true, "El estado es requerido"],
  },
  userRol: {
    type: Object,
  },
})

UsuarioSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject()
  user.uid = _id
  return user
}
module.exports = model("Usuario", UsuarioSchema)
