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
  const errors = data.results?.filter(r => r.type === 'error');
  if (errors && errors.length > 0) {
      console.error(errors[0].error);
      throw new Error("DB Error");
  }
  return data.results?.[0]?.response?.result;
}

async function fixMayorMenu() {
  console.log('Inserting Mayor menu children...');
  const parentId = 'menu-mayor';
  const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
  
  const children = [
    ['mayor-profile', "Mayor's Profile", 'mayor', 1],
    ['mayor-structure', 'Structure', 'about', 2],
    ['mayor-cabinet', 'Cabinet Members', 'cabinet', 3],
    ['mayor-smart-city', 'Smart City', 'smart-city', 4]
  ];

  for (const [id, label, pageId, order] of children) {
    await tursoExec(
      `INSERT OR REPLACE INTO MenuItem (id, label, "order", isVisible, parentId, pageId, updatedAt, createdAt) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, label, order, 1, parentId, pageId, now, now]
    );
  }
  
  console.log("Fix successful!");
}

fixMayorMenu().catch(console.error);
