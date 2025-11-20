import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { agendamentosmarcados } from "./calendario";
import { salvarAgendamento } from "./bancodedados/appointments";

const PINK = '#ff9ee6';

export default function AgendamentoScreen() {
  const [selected, setSelected] = useState(null);
  const [nome, setNome] = useState('');
  const [servico, setServico] = useState('');
  const [preco, setPreco] = useState('');
  const [horario, setHorario] = useState('');

  async function handleSave() {
    if (!selected) {
      alert("Selecione uma data no calendário.");
      return;
    }
    if (!nome.trim() || !servico.trim() || !preco.trim() || !horario.trim()) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      await salvarAgendamento({
        date: selected,
        name: nome,
        time: horario,
        services: [
          { nome: servico, preco: preco }
        ]
      });

      console.log("Salvo no banco!");

    } catch (e) {
      console.log("Erro ao salvar no banco:", e);
      alert("Erro ao salvar no banco de dados");
      return;
    }

    // ----- Atualizar o objeto local (opcional, usado pelo calendário) -----
    agendamentosmarcados[selected] = {
      name: nome,
      time: horario,
      services: [
        { nome: servico, preco: `R$ ${preco}` }
      ]
    };

    alert("Agendamento salvo!");

    // Limpar campos
    setNome("");
    setServico("");
    setPreco("");
    setHorario("");
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Agendar Horário</Text>

      <Calendar
        onDayPress={(day) => setSelected(day.dateString)}
        markedDates={{
          [selected]: {
            selected: true,
            selectedColor: PINK,
            selectedTextColor: '#fff'
          }
        }}
        theme={{
          todayTextColor: PINK,
          arrowColor: PINK,
          monthTextColor: '#000',
          textDayFontWeight: '500',
          textDisabledColor: '#bdbdbd'
        }}
        style={styles.calendar}
      />

      <Text style={styles.label}>Nome do cliente</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Maria"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>Serviço</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Corte e Escova"
        value={servico}
        onChangeText={setServico}
      />

      <Text style={styles.label}>Preço</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 50.00"
        value={preco}
        keyboardType="numeric"
        onChangeText={setPreco}
      />

      <Text style={styles.label}>Horário</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 14:00 - 15:00"
        value={horario}
        onChangeText={setHorario}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar Agendamento</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  calendar: {
    borderRadius: 20,
    elevation: 4,
    marginBottom: 20
  },
  label: {
    marginTop: 10,
    fontWeight: '500',
    fontSize: 16
  },
  input: {
    borderWidth: 1,
    borderColor: PINK,
    borderRadius: 12,
    padding: 12,
    marginTop: 6
  },
  button: {
    marginTop: 20,
    backgroundColor: PINK,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});