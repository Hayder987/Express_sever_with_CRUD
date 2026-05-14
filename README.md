# 🚀 EXpress_CRUD_With_NeonDB

A simple and clean **CRUD API** built with **Express.js + TypeScript + PostgreSQL (NeonDB)**.

---

## 📌 Features

* ✅ Express.js (v5)
* ✅ TypeScript support
* ✅ PostgreSQL (NeonDB)
* ✅ REST API (CRUD)
* ✅ Environment variables using dotenv
* ✅ Clean project structure

---

## 🛠️ Tech Stack

* ⚙️ Node.js
* 🚀 Express.js
* 🟦 TypeScript
* 🐘 PostgreSQL (NeonDB)
* 🔌 pg (node-postgres)
* 🌱 dotenv
* ⚡ tsx (for running TS files)

---

## 📂 Project Structure

```
src/
 ├── server.ts
 ├── config/
 
```

---

## 🔐 Environment Variables

Create a `.env` file in root:

```
PORT=5000
CONNECTIONSTRING=your_neon_db_connection_string
```

---

### Development mode

```
npm run dev
```

---

## 📡 API Response Example

```json
{
  "status": true,
  "message": "User Get Successfully",
  "data": [
    {
      "id": 3,
      "name": "hayder",
      "email": "hayder405@gmail.com",
      "password": "pass123",
      "is_active": true,
      "age": 25,
      "created_at": "2026-05-14T09:32:27.457Z",
      "updated_at": "2026-05-14T09:32:27.457Z"
    }
  ]
}
```

---

## 📌 API Endpoints (Example)

| Method | Endpoint   | Description     |
| ------ | ---------- | --------------- |
| GET    | /users     | Get all users   |
| GET    | /users/:id | Get single user |
| POST   | /users     | Create user     |
| PATCH  | /users/:id | Update user     |
| DELETE | /users/:id | Delete user     |

---

## 🧠 Notes

* `SERIAL` id auto generates from database
* `created_at` & `updated_at` handled by PostgreSQL
* Never push `.env` or `node_modules` to GitHub

---

## 📦 Scripts

```
npm run dev
```

---

## 👨‍💻 Author

**Hayder Ali**
Full Stack Developer 🚀

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

---
