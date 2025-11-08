import Pool from "./pool.js";

export async function getUsers() {
  const { rows } = await Pool.query(`SELECT * FROM users;`);
  return rows;
}

export async function getUserInfoByUsername(username) {
  const { rows } = await Pool.query(`SELECT * FROM users WHERE username = $1`, [
    username,
  ]);
  return rows;
}

export async function getUserInfoByID(id) {
  const { rows } = await Pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return rows;
}

export async function getMessages() {
  const { rows } = await Pool.query(`
    SELECT messages.id AS id, messages.text AS text, messages.title AS title, 
    messages.created_at AS created_at, users.username AS author FROM messages
    JOIN users ON messages.author = users.id;
    `);
  return rows;
}
