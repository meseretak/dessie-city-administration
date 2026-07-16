const fs = require('fs');

const TURSO_URL = process.env.TURSO_DATABASE_URL.replace('libsql://', 'https://');
const TURSO_TOKEN = process.env.TURSO_AUTH_TOKEN;

async function tursoExec(sql, args = []) {
  const res = await fetch(`${TURSO_URL}/v2/pipeline`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TURSO_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      requests: [
        {
          type: 'execute',
          stmt: {
            sql,
            args: args.map((a) =>
              a === null || a === undefined
                ? { type: 'null' }
                : { type: 'text', value: String(a) }
            ),
          },
        },
        { type: 'close' },
      ],
    }),
  });
  const data = await res.json();
  if (data.results?.[0]?.type === 'error') {
      console.error(data.results[0].error);
      throw new Error("DB Error");
  }
  return data.results?.[0]?.response?.result;
}

async function reorderMayorMenu() {
  console.log('Reordering Mayor menu structure...');
  
  await tursoExec(`UPDATE MenuItem SET "order" = 1 WHERE id = 'mayor-profile'`);
  await tursoExec(`UPDATE MenuItem SET "order" = 2 WHERE id = 'mayor-structure'`);
  await tursoExec(`UPDATE MenuItem SET "order" = 3 WHERE id = 'mayor-cabinet'`);
  await tursoExec(`UPDATE MenuItem SET "order" = 4 WHERE id = 'mayor-smart-city'`);
  
  console.log("Reorder successful!");
}

reorderMayorMenu().catch(console.error);
