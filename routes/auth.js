const { Router } = require("express")
const { check } = require("express-validator")
const { login, googleSingIn } = require("../controllers/auth")
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

router.post(
  "/loginGoogle",
  [check("id_token", "Token es necesario").not().isEmpty(), validateFields],
  validateFields,
  googleSingIn
)

module.exports = router
