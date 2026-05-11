const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || "db",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "notesdb",
  port: 5432,
});

app.get("/", (req, res) => {
  res.send("Notes backend is running");
});

app.get("/notes", async (req, res) => {
  const result = await pool.query("SELECT * FROM notes ORDER BY id DESC");
  res.json(result.rows);
});

app.post("/notes", async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: "Note content required" });

  const result = await pool.query(
    "INSERT INTO notes (content) VALUES ($1) RETURNING *",
    [content]
  );

  res.status(201).json(result.rows[0]);
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});