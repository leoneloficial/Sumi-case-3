const { proto } = require("@whiskeysockets/baileys");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const handler = async (msg, { conn }) => {
  const isGroup = msg.key.remoteJid.endsWith("@g.us");
  const start = Date.now();

  const sent = await conn.sendMessage(
    msg.key.remoteJid,
    { text: "❀ *Ping...* (calculando ping)" },
    { quoted: msg }
  );

  const ping = Date.now() - start;

  const resultText = `❀ *Ping:*\n> ${ping} ms`;

  if (isGroup) {
    // Esperar un poco antes de editar (por seguridad de sincronización)
    await sleep(100);

    await conn.relayMessage(
      msg.key.remoteJid,
      {
        protocolMessage: {
          key: sent.key,
          type: 14,
          editedMessage: proto.Message.fromObject({
            conversation: resultText
          })
        }
      },
      { messageId: sent.key.id }
    );
  } else {
    // En privado: envía segundo mensaje separado
    await conn.sendMessage(
      msg.key.remoteJid,
      { text: resultText },
      { quoted: msg }
    );
  }
};

handler.command = ["ping"];
module.exports = handler;
