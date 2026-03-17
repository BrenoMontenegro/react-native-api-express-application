import { View, Text, FlatList, Button, Alert } from "react-native"
import { useEffect, useState, useCallback } from "react"
import { useFocusEffect } from "@react-navigation/native"
import api from "../services/api"

export default function ListaNotas({ navigation }) {
  const [notas, setNotas] = useState([])

  async function carregarNotas() {
    try {
      const response = await api.get("/notas")
      setNotas(response.data)
    } catch (error) {
      console.log("Erro ao buscar notas:", error)
      Alert.alert("Erro", "Não foi possível carregar as notas")
    }
  }

  useEffect(() => {
    carregarNotas()
  }, [])

  useFocusEffect(
    useCallback(() => {
      carregarNotas()
    }, [])
  )

  function confirmarDelecao(id) {
    Alert.alert(
      "Excluir nota",
      "Tem certeza que deseja deletar?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Deletar", onPress: () => deletarNota(id) }
      ]
    )
  }

  async function deletarNota(id) {
    try {
      await api.delete(`/notas/${id}`)
      carregarNotas()
    } catch (error) {
      console.log("Erro ao deletar:", error)
      Alert.alert("Erro", "Não foi possível deletar a nota")
    }
  }

  return (
    <View style={{ padding: 20, flex: 1 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>
        Minhas notas
      </Text>

      <Button
        title="Nova nota"
        onPress={() => navigation.navigate("CriarNota")}
      />

      <FlatList
        data={notas}
        keyExtractor={(item) => item.id.toString()}
        style={{ marginTop: 15 }}
        ListEmptyComponent={
          <Text>Nenhuma nota encontrada.</Text>
        }
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 15,
              padding: 10,
              borderWidth: 1,
              borderRadius: 5
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {item.titulo}
            </Text>

            <Text style={{ marginBottom: 10 }}>
              {item.conteudo}
            </Text>

            <Button
              title="Deletar"
              onPress={() => confirmarDelecao(item.id)}
            />
          </View>
        )}
      />
    </View>
  )
}