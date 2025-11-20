import { getDB } from "./database"; // liga o banco de dados 

// verifica se existem dados
export async function hasAnyAppointment() {
  const db = getDB();
  const result = await db.getFirstAsync(
    "SELECT COUNT(*) AS total FROM appointments"
  );
  return result.total > 0;
}

// salva agendamento
export async function salvarAgendamento(agendamento) {
  const db = getDB();

  const result = await db.runAsync(
    `
      INSERT INTO appointments (date, name, time)
      VALUES (?, ?, ?)
    `,
    [agendamento.date, agendamento.name, agendamento.time]
  );

  const appointmentId = result.lastInsertRowId;

  for (const serv of agendamento.services) {
    await db.runAsync(
      `
        INSERT INTO services (appointment_id, nome, preco)
        VALUES (?, ?, ?)
      `,
      [appointmentId, serv.nome, serv.preco]
    );
  }

  console.log("Agendamento salvo no banco:", agendamento.date);
  return true;
}

// carregar dados no formato do calendário
export async function getAllAppointmentsFormatted() {
  const db = getDB();

  const appointments = await db.getAllAsync(`
    SELECT id, date, name, time
    FROM appointments
  `);

  const result = {};

  for (const item of appointments) {
    const servicos = await db.getAllAsync(
      `SELECT nome, preco FROM services WHERE appointment_id = ?`,
      [item.id]
    );

    result[item.date] = {
      name: item.name,
      time: item.time,
      services: servicos,
    };
  }
  return result;
}