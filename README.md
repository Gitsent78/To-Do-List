# TASKR — To-Do List App

A dark mode full-stack To-Do List app built with HTML, CSS, JavaScript, Node.js, Express, and MySQL.

---

## 📁 Project Files

| File | Purpose |
|---|---|
| `index.html` | Frontend structure |
| `style.css` | Dark mode styling |
| `app.js` | Frontend logic |
| `server.js` | Backend API routes |
| `db.js` | MySQL connection config |
| `setup.sql` | Database & table setup |

---

## ⚙️ Features

- ✅ Add tasks
- ✅ Delete tasks
- ✅ Mark tasks as complete
- ✅ Due dates with overdue alerts
- ✅ Filter by All / Pending / Done
- ✅ MySQL database (data persists)

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm init -y
npm install express mysql2
```

### 2. Set up MySQL database
```bash
mysql -u root -p < setup.sql
```

### 3. Update your credentials in `db.js`
```js
user: 'root',      // your MySQL username
password: '',      // your MySQL password
```

### 4. Start the server
```bash
node server.js
```

### 5. Open in browser
```
http://localhost:3000
```

---

## 🗄️ Database Schema

```sql
TABLE tasks (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  text       VARCHAR(255) NOT NULL,
  due        DATE DEFAULT NULL,
  done       BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

---

## 🌐 API Endpoints

| Method | Route | Description |
|---|---|---|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create a new task |
| PATCH | `/api/tasks/:id` | Update a task (done/undone) |
| DELETE | `/api/tasks/:id` | Delete a task |

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** Node.js, Express
- **Database:** MySQL
