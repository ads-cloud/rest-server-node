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
    type: String,
    required: true,
    enum: ["ADMIN", "USER"],
  },
  status: {
    type: Boolean,
    required: [true, "El estado es requerido"],
  },
})

UsuarioSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject()
  return user
}
module.exports = model("Usuario", UsuarioSchema)
