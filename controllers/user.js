const { response } = require("express")

const userGet = (req, res = response) => {
  const { id, nombre } = req.query
  res.json({ ok: true, msg: "rest GET - controller", id, nombre })
}

const userSave = (req, res) => {
  const { nombre, edad } = req.body
  res.json({ ok: true, msg: "REST save", nombre, edad })
}

const userUpdate = (req, res) => {
  const id = req.params.id
  res.json({ ok: true, msg: "REST update", id })
}

const userDelete = (req, res) => {
  res.json({ ok: true, msg: "REST delete" })
}

module.exports = {
  userGet,
  userSave,
  userDelete,
  userUpdate,
}
