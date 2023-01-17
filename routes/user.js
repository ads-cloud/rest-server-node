const { Router } = require("express")
const { check } = require("express-validator")
const { validateFields } = require("../middlewares/validate fields")
const {
  validateRol,
  existEmail,
  existUserById,
} = require("../helpers/db-validators")

const {
  userGet,
  userSave,
  userUpdate,
  userDelete,
} = require("../controllers/user")

const router = Router()

router.get("/", userGet)

router.post(
  "/",
  [
    check("correo", "Correo no valido").isEmail(),
    check("correo", "Correo es obligatorio").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("edad", "La edad es obligatoria").not().isEmpty(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    check("password", "La contraseña debe tener minimo 8 caracteres").isLength({
      min: 8,
    }),
    check("rol").custom(validateRol),
    check("correo").custom(existEmail),
    validateFields,
  ],
  userSave
)

router.put(
  "/:id",
  [
    check("id", "Id no valido").isMongoId(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("edad", "La edad es obligatoria").not().isEmpty(),
    check("rol").custom(validateRol),
  ],
  check("id").custom(existUserById),
  validateFields,
  userUpdate
)

router.delete(
  "/:id",
  [check("id", "Id no valido").isMongoId()],
  check("id").custom(existUserById),
  validateFields,
  userDelete
)

module.exports = router
