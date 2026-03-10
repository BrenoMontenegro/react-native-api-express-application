require("dotenv").config()
const express = require("express")
const app = express()
const pool = require("./db")

app.use(express.json())

app.post("/usuarios", async (req, res) => {
  const { nome, idade } = req.body

  try {
    const result = await pool.query(
      "INSERT INTO usuarios (nome, idade) VALUES ($1, $2) RETURNING *",
      [nome, idade]
    )

    res.json(result.rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).send("Erro ao criar usuário")
  }
})

app.get("/usuarios", async (req, res) => {
    const result = await pool.query("SELECT * FROM usuarios")
    res.json(result.rows)
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

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Erro ao conectar no banco:", err)
  } else {
    console.log("Banco conectado com sucesso!")
    console.log(res.rows)
  }
})

app.listen(3000, () => {
    console.log("Servidor rodando")
})