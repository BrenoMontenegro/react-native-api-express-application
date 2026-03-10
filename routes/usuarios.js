const express = require("express")
const router = express.Router()
const pool = require("../db")

router.post("/", async (req, res) => {
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

router.get("/", async (req, res) => {
    try {
    const result = await pool.query("SELECT * FROM usuarios")
    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).send("Erro ao buscar usuários")
  }
})

router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { nome, idade } = req.body

  try {
    const result = await pool.query(
      "UPDATE usuarios SET nome = $1, idade = $2 WHERE id = $3 RETURNING *",
      [nome, idade, id]
    )

    res.json(result.rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).send("Erro ao atualizar usuário")
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    await pool.query(
      "DELETE FROM usuarios WHERE id = $1",
      [id]
    )

    res.send("Usuário deletado")
  } catch (error) {
    console.error(error)
    res.status(500).send("Erro ao deletar usuário")
  }
})

module.exports = router