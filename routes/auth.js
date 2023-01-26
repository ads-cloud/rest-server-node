const { Router } = require("express")
const { check } = require("express-validator")
const { login } = require("../controllers/auth")
const { validateFields } = require("../middlewares/validate fields")

const router = Router()

router.post(
  "/login",
  [
    check("correo", "Correo no valido").isEmail(),
    check("correo", "Correo es obligatorio").not().isEmpty(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validateFields,
  ],
  login
)

module.exports = router
