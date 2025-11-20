import { LinearGradient } from 'expo-linear-gradient'; // degradee no fundo da tela
import { useRouter } from 'expo-router'; // navegar entre as telas
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'; // imagem, conteiner colocar componentes em cima da imagem

export default function Index() {
  const router = useRouter();

  // fazer comentarios dentro da funcao usando /* o React interpreta // como texto dentro do JSX
  return (
    <View style={styles.container}>
      {/* fundo com a imagem e degradee */}
      <View style={styles.topSection}>
        <ImageBackground
          source={require('../assets/images/background.png')} // imagem de fundo do salao
          style={styles.imageBackground}
          resizeMode="cover"
        >
          {/* efeito degradee */}
          <LinearGradient
            colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
            style={styles.gradient}
          />

          {/* logo sobre a imagem */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </ImageBackground>
      </View>

      {/* texto e botoes */}
      <View style={styles.bottomSection}>
        <Text style={styles.title}>Agende seu horário agora</Text>

        {/* corrigido: agora leva para o calendário */}
        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() => router.push('/calendario')}
        >
          <Text style={styles.buttonPrimaryText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => router.push('/cadastro')}
        >
          <Text style={styles.buttonSecondaryText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => router.push('/testbd')}
        >
          <Text style={styles.buttonSecondaryText}>Banco de Dados</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}



const PINK = '#ff9ee6';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topSection: {
    height: '45%', 
    overflow: 'hidden',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  logoContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: '40%',
  },
  logo: {
    width: 100,
    height: 100,
  },
  bottomSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonPrimary: {
    backgroundColor: PINK,
    paddingVertical: 14,
    width: '80%',
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonPrimaryText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonSecondary: {
    borderWidth: 1,
    borderColor: PINK,
    paddingVertical: 14,
    width: '80%',
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15
  },
  buttonSecondaryText: {
    color: PINK,
    fontWeight: 'bold',
    fontSize: 16,
  },
});


