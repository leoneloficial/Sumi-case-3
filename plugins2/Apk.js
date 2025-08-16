const fetch = require('node-fetch');

const handler = async (msg, { conn, text, args, usedPrefix, command }) => {
  if (!args.length) {
    return await conn.sendMessage(msg.key.remoteJid, {
      text: `✧ *Uso incorrecto.*\n> Ejemplo: \`${usedPrefix + command} whatsapp\``
    }, { quoted: msg });
  }

  const query = args.join(" ");
  const apiUrl = `https://api.neoxr.eu/api/apk?q=${encodeURIComponent(query)}&no=1&apikey=russellxz`;

  await conn.sendMessage(msg.key.remoteJid, {
    react: { text: "🕐", key: msg.key }
  });

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`Error de la API: ${response.status} ${response.statusText}`);

    const data = await response.json();
    if (!data.status || !data.data || !data.file || !data.file.url) {
      throw new Error("No se pudo obtener información del APK.");
    }

    const apkInfo = data.data;
    const apkFile = data.file;

    const fileResponse = await fetch(apkFile.url);
    if (!fileResponse.ok) throw new Error("No se pudo descargar el archivo APK.");
    const fileBuffer = await fileResponse.buffer();

    const caption = `*「✦」* *Nombre:* *${apkInfo.name}*
\n` +
                    `❒ *Tamaño:* ${apkInfo.size}\n` +
                    `❀ *Rating:* ${apkInfo.rating}\n` +
                    `✧ *Instalaciones:* ${apkInfo.installs}\n` +
                    `❍ *Desarrollador:* ${apkInfo.developer}\n` +
                    `❖ *Categoría:* ${apkInfo.category}\n` +
                    `✰ *Versión:* ${apkInfo.version}\n` +
                    `✎ *Actualizado:* ${apkInfo.updated}\n` +
                    `⚘ *Requisitos:* ${apkInfo.requirements}\n` +
                    `🜸  *ID:* ${apkInfo.id}\n`;

    await conn.sendMessage(msg.key.remoteJid, {
      image: { url: apkInfo.thumbnail },
      caption,
      mimetype: 'image/jpeg'
    }, { quoted: msg });

    await conn.sendMessage(msg.key.remoteJid, {
      document: fileBuffer,
      mimetype: 'application/vnd.android.package-archive',
      fileName: apkFile.filename
    }, { quoted: msg });

    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: "✅", key: msg.key }
    });

  } catch (err) {
    console.error("❌ Error en el comando apk:", err.message);
    await conn.sendMessage(msg.key.remoteJid, {
      text: `❌ *Error al procesar la solicitud:*\n_${err.message}_\n\n🔹 Inténtalo más tarde.`
    }, { quoted: msg });

    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: "❌", key: msg.key }
    });
  }
};

handler.command = ['apk'];
module.exports = handler;
