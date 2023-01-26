const express = require("express")
const cors = require("cors")
const { dbConnection } = require("../database/config")
class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT || 3000
    this.usersPath = "/api/users"
    this.authPath = "/api/auth"
    this.connectDb()
    this.middlewares()
    this.routes()
  }

  async connectDb() {
    await dbConnection()
  }

  middlewares() {
    //cors
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.static("public"))
  }

  routes() {
    this.app.use(this.authPath, require("../routes/auth"))
    this.app.use(this.usersPath, require("../routes/user"))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servicio corriendo en puerto", this.port)
    })
  }
}

module.exports = Server
