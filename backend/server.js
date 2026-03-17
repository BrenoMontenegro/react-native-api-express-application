require("dotenv").config()
const express = require("express")
const app = express()

const notasRoutes = require("./routes/notas")

app.use(express.json())

app.use("/notas", notasRoutes)

app.listen(3000, "0.0.0.0", () => {
    console.log("Servidor funcionando!")
})