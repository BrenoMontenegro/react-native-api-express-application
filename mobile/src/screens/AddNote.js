import { View, Text, TextInput, Button, Alert } from "react-native"
import { useRouter } from "expo-router"
import { useState } from "react"
import api from "../services/api"

export default function CriarNota() {
  const router = useRouter()
  const [titulo, setTitulo] = useState("")
  const [conteudo, setConteudo] = useState("")

  async function salvarNota() {
    try {
      await api.post("/notas", {
        titulo,
        conteudo
      })

      Alert.alert("Sucesso", "Nota criada!")

      setTitulo("")
      setConteudo("")

      router.back()
    } catch (error) {
      console.log(error)
      Alert.alert("Erro ao criar nota")
    }
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Nova nota</Text>

      <TextInput
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
        style={{ borderWidth: 1, marginTop: 10, padding: 10 }}
      />

      <TextInput
        placeholder="Conteúdo"
        value={conteudo}
        onChangeText={setConteudo}
        style={{ borderWidth: 1, marginTop: 10, padding: 10 }}
      />

      <Button title="Salvar" onPress={salvarNota} />
    </View>
  )
}