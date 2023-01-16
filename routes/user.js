const { Router } = require("express")
const {
  userGet,
  userSave,
  userUpdate,
  userDelete,
} = require("../controllers/user")

const router = Router()

router.get("/", userGet)
router.post("/", userSave)
router.put("/:id", userUpdate)
router.delete("/", userDelete)

module.exports = router
