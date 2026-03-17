import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import ListaNotas from "../screens/NotesList"
import CriarNota from "../screens/AddNote"

const Stack = createNativeStackNavigator()

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Notas" component={ListaNotas} />
        <Stack.Screen name="CriarNota" component={CriarNota} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}