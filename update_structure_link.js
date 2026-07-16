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

async function updateStructure() {
  console.log('Updating structure menu link...');
  
  await tursoExec(
    `UPDATE MenuItem SET pageId = ? WHERE id = ?`,
    ['structure', 'mayor-structure']
  );
  
  console.log("Update successful!");
}

updateStructure().catch(console.error);
