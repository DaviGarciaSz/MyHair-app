import { Stack } from 'expo-router'; // gerenciamento de telas empilha elas
import { SafeAreaProvider } from 'react-native-safe-area-context'; // ajusta o conteudo do app para caber na tela do celular

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="clientDetails" />
      </Stack>
    </SafeAreaProvider>
  );
}
