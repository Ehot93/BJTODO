const express = require('express');
const cors = require('cors');
const tasks = require('./tasks.json');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3001;

app.use(cors(), express.json())

// Init SQLite DB
const db = new sqlite3.Database('./beejee.db');
db.serialize(() => {

  db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    text TEXT NOT NULL,
    isDone INTEGER NOT NULL
  )`);
});

app.get('/', (req, res) => {
  db.all('SELECT id, username, email, text, isDone FROM tasks', async (err, rows) => {
    if (err) {
      console.error('DB select error:', err);
      return res.status(500).json({ error: 'DB error' });
    }
    if (!rows || rows.length === 0) {
      // seed from tasks.json once
      const stmt = db.prepare('INSERT OR IGNORE INTO tasks (id, username, email, text, isDone) VALUES (?, ?, ?, ?, ?)');
      for (const t of tasks.data) {
        stmt.run(t.id, t.username, t.email, t.text, t.isDone ? 1 : 0);
      }
      stmt.finalize(() => {
        db.all('SELECT id, username, email, text, isDone FROM tasks', (e2, seeded) => {
          if (e2) return res.status(500).json({ error: 'DB error' });
          return res.json({ data: seeded.map(r => ({ ...r, isDone: !!r.isDone })) });
        });
      });
    } else {
      return res.json({ data: rows.map(r => ({ ...r, isDone: !!r.isDone })) });
    }
  });
})

app.post('/login', (req, res) => {
  const reqData = req.body;
  
  if((reqData.username.toLowerCase() == 'admin') && (reqData.password == 123)){
    res.json({user: 'ADMIN'});
  } else res.json({user: 'USER'});
  
})

// Create new user -> insert into beejee.db
app.post('/users', (req, res) => {
  const { username, email, password } = req.body || {};
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'username, email, password are required' });
  }
  db.run(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, password],
    function(err) {
      if (err) {
        console.error('DB insert error:', err);
        return res.status(500).json({ error: 'DB error' });
      }
      res.status(201).json({ id: this.lastID, username, email });
    }
  );
});

app.put('/newTask', (req, res) => {
  const { id, username, email, text, isDone } = req.body || {};
  if (!id || !username || !email || typeof text !== 'string' || typeof isDone === 'undefined') {
    return res.status(400).json({ error: 'id, username, email, text, isDone are required' });
  }
  db.run(
    'INSERT OR REPLACE INTO tasks (id, username, email, text, isDone) VALUES (?, ?, ?, ?, ?)',
    [id, username, email, text, isDone ? 1 : 0],
    function(err) {
      if (err) {
        console.error('DB insert task error:', err);
        return res.status(500).json({ error: 'DB error' });
      }
      db.all('SELECT id, username, email, text, isDone FROM tasks', (selErr, rows) => {
        if (selErr) {
          console.error('DB select after insert error:', selErr);
          return res.status(500).json({ error: 'DB error' });
        }
        return res.status(201).json({ data: rows.map(r => ({ ...r, isDone: !!r.isDone })) });
      });
    }
  );
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
