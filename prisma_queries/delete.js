import Pool from "./pool.js";

export async function removeMessage(params) {
  await Pool.query(
    `
        DELETE FROM messages
        WHERE id = $1;
      `,
    [params]
  );
}

export async function clearTables() {
  await Pool.query(
    `
     TRUNCATE users RESTART IDENTITY CASCADE;
          
    `
  );
}
