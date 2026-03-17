require("dotenv").config()
const express = require("express")
const app = express()

const usuariosRoutes = require("./routes/usuarios")
const notasRoutes = require("./routes/notas")


app.use(express.json())

app.use("/usuarios", usuariosRoutes)
app.use("/notas", notasRoutes)

app.listen(3000, () => {
    console.log("Servidor rodando!")
})