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

async function seedMayorMenu() {
  console.log('Seeding Mayor menu structure...');
  
  // 1. Ensure MAYOR parent exists
  const parentId = 'mayor-parent';
  await tursoExec(
    `INSERT OR IGNORE INTO MenuItem (id, label, "order", isVisible, parentId, pageId) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [parentId, 'MAYOR', 2, 1, null, 'mayor']
  );

  // 2. Add children: Structure, Smart City, Cabinet Members
  await tursoExec(
    `INSERT OR IGNORE INTO MenuItem (id, label, "order", isVisible, parentId, pageId) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    ['mayor-profile', "Mayor's Profile", 1, 1, parentId, 'mayor']
  );

  await tursoExec(
    `INSERT OR IGNORE INTO MenuItem (id, label, "order", isVisible, parentId, pageId) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    ['mayor-cabinet', 'Cabinet Members', 2, 1, parentId, 'cabinet']
  );

  await tursoExec(
    `INSERT OR IGNORE INTO MenuItem (id, label, "order", isVisible, parentId, pageId) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    ['mayor-smart-city', 'Smart City', 3, 1, parentId, 'smart-city']
  );

  await tursoExec(
    `INSERT OR IGNORE INTO MenuItem (id, label, "order", isVisible, parentId, pageId) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    ['mayor-structure', 'Structure', 4, 1, parentId, 'structure']
  );

  // Update them in case they exist but with different parent
  await tursoExec(
    `UPDATE MenuItem SET parentId = ?, isVisible = 1 WHERE id IN ('mayor-profile', 'mayor-cabinet', 'mayor-smart-city', 'mayor-structure')`,
    [parentId]
  );
  
  console.log("Seed successful!");
}

seedMayorMenu().catch(console.error);
