const fs = require('fs');
let c = fs.readFileSync('src/app/api/admin/fix-data/route.ts', 'utf8');
c = c.replace(
  "{ id: 'sub-mayor-cabinet', label: 'Cabinet Members',  pageId: 'mayor', parentId: 'menu-mayor', order: 2 },",
  `{ id: 'sub-mayor-cabinet', label: 'Cabinet Members',  pageId: 'cabinet', parentId: 'menu-mayor', order: 2 },
      { id: 'sub-mayor-structure', label: 'Structure',  pageId: 'structure', parentId: 'menu-mayor', order: 3 },
      { id: 'sub-mayor-smart', label: 'Smart City',  pageId: 'smart-city', parentId: 'menu-mayor', order: 4 },`
);
fs.writeFileSync('src/app/api/admin/fix-data/route.ts', c);
