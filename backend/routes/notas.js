const express = require("express")
const router = express.Router()

let notas = []
let idAtual = 1

router.get("/", (req, res) => {
  res.json(notas)
})

router.get("/:id", (req, res) => {
  const nota = notas.find(n => n.id == req.params.id)
  res.json(nota)
})

router.post("/", (req, res) => {
  const { titulo, conteudo } = req.body

  const novaNota = {
    id: idAtual++,
    titulo,
    conteudo
  }

  notas.push(novaNota)

  res.json(novaNota)
})

router.put("/:id", (req, res) => {
  const { titulo, conteudo } = req.body

  const nota = notas.find(n => n.id == req.params.id)

  if (!nota) {
    return res.status(404).json({ erro: "Nota não encontrada" })
  }

  nota.titulo = titulo
  nota.conteudo = conteudo

  res.json(nota)
})

router.delete("/:id", (req, res) => {
  notas = notas.filter(n => n.id != req.params.id)
  res.json({ mensagem: "Nota removida" })
})

module.exports = router