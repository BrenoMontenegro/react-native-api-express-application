const express = require("express")
const app = express()

app.use(express.json())
let users = []

app.post("/users", (req, res) => {
    const user = req.body
    users.push(user)
    res.json(user)
})

app.get("/users", (req, res) => {
    res.json(users)
})

app.put("/users/:id", (req, res) => {
    const id = req.params.id
    const newUser = req.body

    users[id] = newUser

    res.json(newUser)
})

app.delete("/users/:id", (req, res) => {
    const id = req.params.id

    users.splice(id, 1)

    res.send("Usuário removido")
})

app.listen(3000, () => {
    console.log("Servidor rodando")
})