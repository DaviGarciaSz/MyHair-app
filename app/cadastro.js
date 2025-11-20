import { useRouter } from 'expo-router'; // navegar entre as paginas
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const PINK = '#ff9ee6';

export default function CadastroScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar conta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#888"
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        placeholderTextColor="#888"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/agendamento')}   // 👉 AGORA FUNCIONA
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  title: {
    fontSize: 28,
    marginBottom: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: PINK,
    borderRadius: 12,
    marginBottom: 15,
    padding: 14,
    backgroundColor: '#fff'
  },
  button: {
    backgroundColor: PINK,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});
