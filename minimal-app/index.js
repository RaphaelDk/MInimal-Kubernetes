const express = require("express");
var pgp = require("pg-promise")();
let path = require("path");
const app = express();
const port = 3000;

const db_user = process.env.POSTGRES_USER
const db_password = process.env.POSTGRES_PASSWORD
const db_host = process.env.POSTGRES_URL

var db = pgp(`postgres://${db_user}:${db_password}@${db_host}:5432/minimal_db`);
// var db = pgp(`postgres://user:password@localhost:5432/minimal_db`);

app.use(express.json());

async function initDb() {
  try {
    await db.any("SELECT * FROM users WHERE id = 1");
  } catch (e) {
    await db.any(`CREATE TABLE users
    (
        id serial PRIMARY KEY,
        name text NOT NULL,
        email text NOT NULL,
        interests text NOT NULL
    )`);

    await db.any(
      `INSERT INTO users (name, email, interests) VALUES ('Henry', 'hello@world.com', 'luc')`
    );
  }
}

initDb();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/profile", async (req, res) => {
  const users = await db.any("SELECT * FROM users WHERE id = 1");

  res.send(users[0]);
});

app.post("/profile", async (req, res) => {
  const newUser = req.body;

  await db.any(
    `UPDATE users SET name = '${newUser.name}', email = '${newUser.email}', interests = '${newUser.interests}'`
  );

  res.send(newUser);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
