const fs = require("fs");
const path = require("path");
const axios = require("axios");

const handler = async (msg, { conn, text, command }) => {
  // Obtener ID del subbot y su prefijo personalizado
  const rawID = conn.user?.id || "";
  const subbotID = rawID.split(":")[0] + "@s.whatsapp.net";

  const prefixPath = path.resolve("prefixes.json");
  let prefixes = {};
  if (fs.existsSync(prefixPath)) {
    prefixes = JSON.parse(fs.readFileSync(prefixPath, "utf-8"));
  }
  const usedPrefix = prefixes[subbotID] || ".";

  if (!text) {
    return await conn.sendMessage(msg.key.remoteJid, {
      text: `❀ Ejemplo de uso:\n> ${usedPrefix + command} https://www.instagram.com/p/CCoI4DQBGVQ/`
    }, { quoted: msg });
  }

  try {
    // ⏳ Reacción mientras se procesa
    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: "🕐", key: msg.key }
    });

    const apiUrl = `https://api.dorratz.com/igdl?url=${text}`;
    const response = await axios.get(apiUrl);
    const { data } = response.data;

    if (!data || data.length === 0) {
      return await conn.sendMessage(msg.key.remoteJid, {
        text: "✧ No se pudo obtener el video de Instagram."
      }, { quoted: msg });
    }

    const caption = ``;

    for (let item of data) {
      await conn.sendMessage(msg.key.remoteJid, {
        video: { url: item.url },
        caption
      }, { quoted: msg });
    }

    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: "✅", key: msg.key }
    });

  } catch (error) {
    console.error("✧ Error en instagram:", error);
    await conn.sendMessage(msg.key.remoteJid, {
      text: "✧ Ocurrió un error al procesar el enlace de Instagram."
    }, { quoted: msg });

    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: "❌", key: msg.key }
    });
  }
};

handler.command = ["instagram", "ig"];
module.exports = handler;
