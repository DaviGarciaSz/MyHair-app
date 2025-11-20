import * as SQLite from "expo-sqlite";

let db = null;

// iniciar banco de dados async
export async function initDatabase() {
  try {
    db = await SQLite.openDatabaseAsync("MyHair.db3");

    await db.execAsync(`
      PRAGMA foreign_keys = ON;

      CREATE TABLE IF NOT EXISTS appointments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        name TEXT,
        time TEXT
      );

      CREATE TABLE IF NOT EXISTS services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        appointment_id INTEGER NOT NULL,
        nome TEXT,
        preco TEXT,
        FOREIGN KEY (appointment_id) REFERENCES appointments(id)
      );
    `);

    console.log("Banco criado com sucesso!");
  } catch (err) {
    console.log("Erro ao iniciar banco:", err);
  }
}

export function getDB() {
  if (!db) throw new Error("Banco não inicializado");
  return db;
}
