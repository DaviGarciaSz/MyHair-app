import { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from "react-native"; 
import { initDatabase, getDB } from "./bancodedados/database";  //cria tabelas, ler o banco de dados
import { hasAnyAppointment, importFromLocalConst } from "./bancodedados/appointments"; // verificar se o bdd esta vazio, ler info do proprio arquivo
import { agendamentosmarcados, limparAgendamentosLocal } from "./calendario"; // importar dados, limpar arquivos

export default function TestBD() {
  const [appointments, setAppointments] = useState([]); // salva agendamentos
  const [services, setServices] = useState([]); // salva servicos ligados ao agendamento

  useEffect(() => { // carrega banco de dados automaticamente
    async function loadData() { 
      await initDatabase(); // antes de continuar o codigo verifica se a tebela foi criada

      const exists = await hasAnyAppointment(); 

      // funcao se escitir ou n arquvios no agendamento
      if (!exists) {
        console.log("Nenhum agendamento encontrado. Importando dados do arquivo calendario.js");
        await importFromLocalConst(agendamentosmarcados);
      }

      const db = getDB();

      const apps = await db.getAllAsync("SELECT * FROM appointments");
      setAppointments(apps);

      const servs = await db.getAllAsync("SELECT * FROM services");
      setServices(servs);
    }

    loadData();
  }, []);

  async function limparBanco() {
  const db = getDB();

  // apagar tabelas do banco
  await db.execAsync(`
    DELETE FROM services;
    DELETE FROM appointments;
  `);

  // chama a funcao pra evitar crash (tive mt erros e crash bizarros n sei se eh totalmente necessario)
  if (typeof limparAgendamentosLocal === 'function') {
    try {
      limparAgendamentosLocal();
    } catch (err) {
      console.warn("Erro ao limpar agendamentos locais:", err);
    }
  } else {
    console.warn("Dados não encontrados verificar os cadastros");
  }

  // limpar estado
  setAppointments([]);
  setServices([]);
    Alert.alert("Pronto!", "Todos os dados foram apagados");
  }

  // aviso de confirmacao
  function confirmarExclusao() {
    Alert.alert(
      "Apagar todos os dados?",
      "Isso vai remover TODOS os agendamentos e serviços do banco.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Apagar", style: "destructive", onPress: limparBanco }
      ]
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Informações</Text>

      <Text style={styles.section}>Agendamentos Salvos:</Text>
      {appointments.map(app => (
        <View key={app.id} style={styles.card}>
          <Text>📅 Data: {app.date}</Text>
          <Text>👤 Cliente: {app.name}</Text>
          <Text>⏰ Horário: {app.time}</Text>
        </View>
      ))}

      <Text style={styles.section}>Serviços Salvos:</Text>
      {services.map(serv => (
        <View key={serv.id} style={styles.card}>
          <Text>💇 Serviço: {serv.nome}</Text>
          <Text>💲 Preço: {serv.preco}</Text>
          <Text>🔗 Agendamento ID: {serv.appointment_id}</Text>
        </View>
      ))}

      {/* botao de apagar */}
      <TouchableOpacity style={styles.deleteButton} onPress={confirmarExclusao}>
        <Text style={styles.deleteButtonText}>Apagar Todos os Dados</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// estilos
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#f7f7f7",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },

  deleteButton: {
    backgroundColor: "#ff4444",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 40,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});