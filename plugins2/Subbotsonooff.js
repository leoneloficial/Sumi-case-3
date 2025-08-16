const fs = require("fs");
const path = require("path");

const filePath = path.resolve("./subbotson.json");

if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify([]));

const handler = async (msg, { conn, command }) => {
  const chatId = msg.key.remoteJid;
  const isGroup = chatId.endsWith("@g.us");

  await conn.sendMessage(chatId, {
    react: { text: "⚙️", key: msg.key }
  });

  if (!isGroup) {
    return await conn.sendMessage(chatId, {
      text: "✧ Este comando solo se puede usar en grupos."
    }, { quoted: msg });
  }

  let data = [];
  try {
    data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch (_) {}

  const alreadyOn = data.includes(chatId);

  if (command === "bot on") {
    if (alreadyOn) {
      return await conn.sendMessage(chatId, {
        text: "ℹ️ El subbot ya está *activado* en este grupo."
      }, { quoted: msg });
    }

    data.push(chatId);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    await conn.sendMessage(chatId, {
      text: "✅ *Subbot activado* en este grupo. Ahora responderá normalmente."
    }, { quoted: msg });

  } else if (command === "bot off") {
    if (!alreadyOn) {
      return await conn.sendMessage(chatId, {
        text: "ℹ️ El subbot ya está *desactivado* en este grupo."
      }, { quoted: msg });
    }

    data = data.filter(g => g !== chatId);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    await conn.sendMessage(chatId, {
      text: "🛑 *Subbot desactivado* en este grupo. Ya no responderá."
    }, { quoted: msg });
  }
};

handler.command = ["bot on", "bot off"];
handler.tags = ["grupo"];
handler.help = ["bot on", "bot off"];
module.exports = handler;
