const mongoose = require("mongoose")
const dbConnection = async () => {
  try {
    mongoose.set("strictQuery", false)
    await mongoose.connect(process.env.MONGO_ATLAS)
    console.log("Database online")
  } catch (error) {
    console.log(error)
    throw new Error("Error al iniciar la base de datos" + error)
  }
}

module.exports = {
  dbConnection,
}
