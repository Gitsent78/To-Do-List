// server.js — Node.js + Express + MySQL backend
const express = require('express');
const db = require('./db');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('.'));

// GET all tasks
app.get('/api/tasks', (req, res) => {
  db.query('SELECT * FROM tasks ORDER BY created_at DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST new task
app.post('/api/tasks', (req, res) => {
  const { text, due } = req.body;
  db.query('INSERT INTO tasks (text, due) VALUES (?, ?)', [text, due || null], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, text, due, done: false });
  });
});

// PATCH update task (mark done/undone)
app.patch('/api/tasks/:id', (req, res) => {
  const { done } = req.body;
  db.query('UPDATE tasks SET done = ? WHERE id = ?', [done, req.params.id], err => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ ok: true });
  });
});

// DELETE task
app.delete('/api/tasks/:id', (req, res) => {
  db.query('DELETE FROM tasks WHERE id = ?', [req.params.id], err => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ ok: true });
  });
});

app.listen(PORT, () => console.log(`TASKR running → http://localhost:${PORT}`));
