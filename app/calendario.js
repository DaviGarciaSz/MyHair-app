import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars'; // config de calendario, ptbr

const PINK = '#ff9ee6';

LocaleConfig.locales['pt'] = { 
  monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro',],
  monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
  dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
  dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
  today: 'Hoje',
};
LocaleConfig.defaultLocale = 'pt';

// "let" para poder excluir os dados e exportar
export let agendamentosmarcados = {
  '2025-11-13': {
    name: 'Maria Silva',
    time: '09:00 - 10:00',
    services: [
      { nome: 'Corte feminino', preco: 'R$ 50' },
      { nome: 'Escova', preco: 'R$ 30' },
    ],
  },
  '2025-11-15': {
    name: 'Ana Souza',
    time: '14:00 - 15:30',
    services: [
      { nome: 'Tintura', preco: 'R$ 80' },
      { nome: 'Hidratação', preco: 'R$ 40' },
    ],
  },
  '2025-11-18': {
    name: 'Juliana Costa',
    time: '16:00 - 17:00',
    services: [
      { nome: 'Corte masculino', preco: 'R$ 40' },
      { nome: 'Barba', preco: 'R$ 25' },
    ],
  },
};

// função exportada para limpar os agendamentos locais
export function limparAgendamentosLocal() {
  agendamentosmarcados = {};
}

export default function Calendario() { 
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState('');

  const markedDates = Object.keys(agendamentosmarcados).reduce((acc, date) => {
    acc[date] = {
      marked: true,
      dotColor: PINK,
      selectedColor: PINK,
    };
    return acc;
  }, {});

  if (selectedDate) {
    markedDates[selectedDate] = {
      ...markedDates[selectedDate],
      selected: true,
      selectedColor: PINK,
    };
  }

  const clienteselicionado = agendamentosmarcados[selectedDate];

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}`;
  };

  return ( 
    <View style={styles.container}>
      <Text style={styles.title}>Próximos Clientes</Text>

      <Calendar 
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={markedDates}
        theme={{
          selectedDayBackgroundColor: PINK,
          todayTextColor: PINK,
          arrowColor: PINK,
          dotColor: PINK,
          monthTextColor: '#333',
          textMonthFontWeight: 'bold',
        }}
      />

      {clienteselicionado ? (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Cliente: {clienteselicionado.name}</Text>
          <Text style={styles.infoText}>Horário: {clienteselicionado.time}</Text>
          <Text style={styles.infoText}>Data: {formatDate(selectedDate)}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              router.push({
                pathname: '/detalhes',
                params: {
                  nome: clienteselicionado.name,
                  horario: clienteselicionado.time,
                  data: formatDate(selectedDate),
                  servicos: JSON.stringify(clienteselicionado.services), 
                },
              })
            }
          >
            <Text style={styles.buttonText}>Ver detalhes do cliente</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.noSelection}>Selecione uma data com cliente</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  infoContainer: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fdf3fb',
    borderWidth: 1,
    borderColor: PINK,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  button: {
    backgroundColor: PINK,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  noSelection: {
    marginTop: 30,
    textAlign: 'center',
    color: '#777',
  },
});
