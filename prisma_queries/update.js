import Pool from "./pool.js";

export async function updateToMember(params) {
  await Pool.query(
    `
        UPDATE users SET
          is_member = true
      WHERE id = $1;
      `,
    [params]
  );
}
