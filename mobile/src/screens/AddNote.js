import { View, Text, TextInput, Button, Alert } from "react-native"
import { useState } from "react"
import api from "../services/api"

export default function CriarNota({ navigation }) {
  const [titulo, setTitulo] = useState("")
  const [conteudo, setConteudo] = useState("")

  async function salvarNota() {
    if (!titulo || !conteudo) {
      Alert.alert("Atenção", "Preencha todos os campos")
      return
    }

    try {
      await api.post("/notas", {
        titulo,
        conteudo
      })

      Alert.alert("Sucesso", "Nota criada!")

      setTitulo("")
      setConteudo("")

      navigation.goBack()
    } catch (error) {
      console.log("Erro ao criar nota:", error)
      Alert.alert("Erro", "Não foi possível criar a nota")
    }
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>
        Nova nota
      </Text>

      <TextInput
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
        style={{
          borderWidth: 1,
          marginTop: 10,
          padding: 10,
          borderRadius: 5
        }}
      />

      <TextInput
        placeholder="Conteúdo"
        value={conteudo}
        onChangeText={setConteudo}
        style={{
          borderWidth: 1,
          marginTop: 10,
          padding: 10,
          borderRadius: 5
        }}
        multiline
      />

      <View style={{ marginTop: 15 }}>
        <Button title="Salvar" onPress={salvarNota} />
      </View>
    </View>
  )
}