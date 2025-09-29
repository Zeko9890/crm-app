import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Open SQLite DB
async function openDb() {
  return open({
    filename: "./crm.db",
    driver: sqlite3.Database,
  });
}

export default async function handler(req, res) {
  const db = await openDb();

  // Create table if not exists
  await db.exec(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      phone TEXT
    )
  `);

  if (req.method === "GET") {
    const contacts = await db.all("SELECT * FROM contacts ORDER BY id DESC");
    res.json(contacts);
  } else if (req.method === "POST") {
    const { name, email, phone } = JSON.parse(req.body);
    await db.run(
      "INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)",
      [name, email, phone]
    );
    res.json({ success: true, message: "Contact added" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}