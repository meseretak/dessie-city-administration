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

async function insertNews() {
  const id = 'news-council-46-' + Date.now();
  const title = 'ደሴ ከተማ ምክር ቤት 46ኛ መደበኛ ጉባዔ | Dessie City Council 46th Regular Session';
  const category = 'News';
  const excerpt = `የዘንድሮው ጉባኤ በሀገራዊ ምክክርና በምርጫ ማግስት መካሄዱ ልዩ ያደርገዋል — አፈ ጉባኤ ምሳየ ከድር | This year's session is made special by taking place in the aftermath of the national dialogue and elections.`;
  const content = `[AMHARIC VERSION]
የደሴ ከተማ ምክር ቤት ለሁለት ቀን የሚቆየው 4ኛ ዙር 13ኛ ዓመት 46ኛ መደበኛ ጉባዔውን ማካሄድ ጀምሯል።
በጉባዔው ላይ የከተማ አስተዳደሩ ተቀዳሚ ምክትል ከንቲባ የተከበሩ አቶ ሳሙኤል ሞላልኝ፣ የምክር ቤት አባላት፣ የመምሪያና ክፍለከተማ አመራርና ጥሪ የተደረገላቸው እንግዶች ተገኝተዋል።
የምክር ቤቱ ዋና አፈ-ጉባኤ ክብርት ምሳየ ከድር በመክፈቻ ንግግራቸው፤ የዘሬውን ጉባኤ ልዩ የሚያደርገው 7ኛው ሀገራዊ ምርጫ በስኬት በተጠናቀቀበት ማግስት እንዲሁም ሀገራዊ ምክክር ኮሚሽን አጀንዳ ቀርጾ ወደ ስራ በገባበት ወቅት መካሄዱ እንደሆነ ገልጸዋል። 
ምርጫው ሰላማዊና ዴሞክራሲያዊ ሆኖ እንዲጠናቀቅ አስተዋጽኦ ላበረከቱ የከተማዋ ነዋሪዎች፣ የፖለቲካ ፓርቲዎች፣ እጩዎችና የፀጥታ አካላትም ምስጋና አቅርበዋል።
በ2018 በጀት ዓመት የ4ኛ ሩብ ዓመት እቅድ አፈጻጸምን በተመለከተ የምክር ቤቱ ቋሚ ኮሚቴዎች በአካል የመስክ ምልከታና በጠረጴዛ ዙሪያ የገመገሙትን ሪፖርትና የውሳኔ ሃሳብ ለምክር ቤቱ ያቀርባሉ ተብሎ ይጠበቃል።
የከተማው የህዝብ ተወካዮች ምክር ቤት አባላት ባደረጉት ጥረት፣ በሰሜኑ ጦርነት ጉዳት ለደረሰባቸው ጤና ጣቢያዎች የሚውል ከ4 ሚሊዮን ብር በላይ የሚገመት የህክምና መገልገያ መሳሪያዎች (የህሙማን አልጋዎች፣ የላቦራቶሪና ልዩ ልዩ የህክምና መመርመሪያዎች) ድጋፍ መደረጉ ተገልጿል።
በከተማው ምክርቤት ተቋቁሞ በአጭር ጊዜ እውቅና ያተረፈው የከተማዋ ኩራት የሆነው "እድገት ጠቅላላ ስራ ተቋራጭ" ለምክር ቤቱ የቢሮ ግብዓቶችን በማሟላት ላደረገው አስተዋጽኦ ምክር ቤቱ እውቅና እንዲሰጠው አፈ-ጉባኤዋ ጠይቀዋል።
የደሴ ከተማ ምክር ቤትና አስፈጻሚው አካል ህግ በማውጣት፣ ክትትልና ቁጥጥር በማድረግ የህዝብን የልማትና የመልካም አስተዳደር ጥያቄዎች ለመመለስ በትኩረት እየሰሩ መሆናቸው ተመላክቷል።
የደሴ ከተማ አስተዳደር ተቀዳሚ ምክትል ከንቲባ አቶ ሳሙኤል ሞላልኝ የከተማ አስተዳደሩን የ2018 በጀት አመት የልማትና መልካም አስተዳደር እቅድ አፈጻጸም ሪፖርት ቀርቦ ውይዬት ይደረግበታል።

---

[ENGLISH VERSION]
The Dessie City Council has commenced its two-day 4th Round, 13th Year, 46th Regular Session.
The session was attended by the Honorable First Deputy Mayor of the City Administration, Mr. Samuel Molalign, Council members, department and sub-city leaders, and invited guests.
In her opening speech, the Honorable Chief Speaker of the Council, Misaye Kedir, stated that what makes today's session special is that it is being held in the aftermath of the successfully completed 7th National Election and at a time when the National Dialogue Commission has formulated its agenda and started work.
She also thanked the residents of the city, political parties, candidates, and security forces who contributed to the peaceful and democratic completion of the election.
Regarding the performance of the 4th quarter plan of the 2018 fiscal year, it is expected that the standing committees of the council will present to the council a report and resolution based on their physical field observations and round-table evaluations.
Through the efforts of the members of the City House of Peoples' Representatives, it was stated that medical equipment (patient beds, laboratory and various medical examination equipment) estimated at over 4 million Birr was provided as support to health centers damaged by the northern war.
The Speaker requested that the council recognize "Edget General Contractor," a pride of the city which was established by the city council and gained recognition in a short time, for its contribution in fulfilling the council's office inputs.
It was indicated that the Dessie City Council and the executive body are working intently to answer the public's development and good governance questions by enacting laws, tracking, and monitoring.
The First Deputy Mayor of Dessie City Administration, Mr. Samuel Molalign, will present the 2018 fiscal year development and good governance plan performance report of the city administration for discussion.`;

  const images = JSON.stringify([
    "/news-council-1.png",
    "/news-council-2.jpg",
    "/news-council-3.jpg",
    "/news-council-4.jpg",
    "/news-council-5.jpg"
  ]);

  const author = "City Admin / ከተማ አስተዳደር";
  const status = "PUBLISHED";
  const approvalStatus = "approved";
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  console.log('Inserting news article...');
  
  await tursoExec(
    `INSERT INTO NewsArticle (id, title, excerpt, content, category, image, author, status, approvalStatus, createdAt, updatedAt) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, title, excerpt, content, category, images, author, status, approvalStatus, createdAt, updatedAt]
  );
  
  console.log("Insert successful!");
}

insertNews().catch(console.error);
