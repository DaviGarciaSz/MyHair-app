import { getDB } from "./database"; // retorna a conexao do banco de dados

// verificar se excistem dados
export async function hasAnyAppointment() {
  const db = getDB();
  const result = await db.getFirstAsync(
    "SELECT COUNT(*) AS total FROM appointments"
  );
  return result.total > 0;
}

// funcao para exportar dados 
export async function importFromLocalConst(agendamentos) {
  const db = getDB();

  for (const date in agendamentos) { 
    const item = agendamentos[date]; 

    const result = await db.runAsync( 
      `
      INSERT INTO appointments (date, name, time)
      VALUES (?, ?, ?)
      `,
      [date, item.name, item.time]
    );

    const appointmentId = result.lastInsertRowId;

    for (const serv of item.services) {
      await db.runAsync(
        `
        INSERT INTO services (appointment_id, nome, preco)
        VALUES (?, ?, ?)
        `,
        [appointmentId, serv.nome, serv.preco]
      );
    }
  }

  console.log("Importação concluída!");
}
