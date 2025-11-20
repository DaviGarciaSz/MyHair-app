import { Ionicons } from '@expo/vector-icons'; // import de icones
import { useLocalSearchParams } from 'expo-router'; // pegar parametros enviados para a tela
import { StyleSheet, Text, View,} from 'react-native';

const PINK = '#ff9ee6';

export default function DetalhesCliente() {
  const params = useLocalSearchParams();

  const {
    nome = 'Cliente Base',
    horario = '12:00 - 14:00',
    data = '01/01/01',
    servicos = JSON.stringify([
      { nome: 'Serviço 1', preco: 'R$ 30' },
      { nome: 'Serviço 2', preco: 'R$ 50' },
      { nome: 'Serviço 3', preco: 'R$ 20' },
    ]),
  } = params;

  // fazer comentarios dentro da funcao usando /* o React interpreta // como texto dentro do JSX
  const listaServicos = JSON.parse(servicos);

  return ( 
    <View style={styles.container}>

      {/* header sem a seta */}
      <View style={styles.header}>
        <View style={{ width: 24 }} />
        <Text style={styles.headerTitle}>Cliente Base</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* icone e nome */}
      <View style={styles.iconContainer}>
        <Ionicons name="person-circle-outline" size={90} color={PINK} />
        <Text style={styles.clientName}>{nome}</Text>
      </View>

      <View style={styles.tabs}>
        <Text style={[styles.tabText, styles.tabActive]}>Proprietário</Text>
        <Text style={styles.tabText}>Cliente</Text>
      </View>

      {/* linha rosa */}
      <View style={styles.tabLine} />

      {/* layout padding cor tamanho etc */}
      <View style={styles.infoBox}>
        <Ionicons name="time-outline" size={20} color={PINK} />
        <Text style={styles.infoText}>{horario}</Text>
        <Ionicons name="create-outline" size={18} color={PINK} style={styles.editIcon} />
      </View>

      <View style={styles.infoBox}>
        <Ionicons name="calendar-outline" size={20} color={PINK} />
        <Text style={styles.infoText}>{data}</Text>
        <Ionicons name="create-outline" size={18} color={PINK} style={styles.editIcon} />
      </View>

      <View style={styles.infoBox}>
        <Ionicons name="cut-outline" size={20} color={PINK} />
        <Text style={styles.infoText}>Tipo de corte</Text>
        <Ionicons name="create-outline" size={18} color={PINK} style={styles.editIcon} />
      </View>

      {/* servicos layout */}
      <View style={styles.servicesBox}>
        {listaServicos.map((serv, index) => (
          <View
            key={index}
            style={[
              styles.serviceRow,
              index < listaServicos.length - 1 && styles.serviceDivider,
            ]}
          >
            <View style={styles.serviceLeft}>
              <Ionicons name="cash-outline" size={18} color={PINK} />
              <Text style={styles.serviceName}>{serv.nome}</Text>
            </View>
            <Text style={styles.servicePrice}>{serv.preco}</Text>
            <Ionicons name="create-outline" size={18} color={PINK} />
          </View>
        ))}
      </View>

    </View>
  );
}

// css2
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: PINK,
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  clientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabText: {
    fontSize: 16,
    color: '#bbb',
  },
  tabActive: {
    color: PINK,
    fontWeight: '600',
  },
  tabLine: {
    height: 2,
    backgroundColor: PINK,
    width: '50%',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  infoBox: {
    borderWidth: 1,
    borderColor: PINK,
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    flex: 1,
    marginLeft: 10,
    color: '#333',
  },
  editIcon: {
    opacity: 0.8,
  },
  servicesBox: {
    borderWidth: 1,
    borderColor: PINK,
    borderRadius: 10,
    marginTop: 10,
    paddingVertical: 8,
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  serviceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  serviceName: {
    marginLeft: 10,
    color: '#333',
  },
  servicePrice: {
    marginRight: 10,
    color: '#333',
  },
  serviceDivider: {
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
});
