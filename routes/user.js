const { Router } = require("express")
const { check } = require("express-validator")

const {
  validateFields,
  validateJWT,
  validateRolAction,
} = require("../middlewares")

const {
  validateRol,
  existEmail,
  existUserById,
  userActive,
} = require("../helpers/db-validators")

const {
  userGet,
  userSave,
  userUpdate,
  userDelete,
  getUserById,
} = require("../controllers/user")

const router = Router()

router.get("/", userGet)

router.post(
  "/",
  validateJWT,
  validateRolAction,
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
  validateJWT,
  validateRolAction,
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
  validateJWT,
  validateRolAction,
  [
    check("id", "Id no valido").isMongoId(),
    check("id").custom(existUserById),
    check("id").custom(userActive),
  ],

  validateFields,
  userDelete
)

router.get(
  "/getUserById/:id",
  [check("id", "El id que envia no es valido").isMongoId()],
  check("id").custom(existUserById),
  validateJWT,
  validateRolAction,
  validateFields,
  getUserById
)

module.exports = router
