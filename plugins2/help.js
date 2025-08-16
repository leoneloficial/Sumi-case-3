const fs = require("fs");
const path = require("path");

const handler = async (msg, { conn }) => {
  try {
    const rawID = conn.user?.id || "";
    const subbotID = rawID.split(":")[0] + "@s.whatsapp.net";

    const prefixPath = path.resolve("prefixes.json");
    const menuConfigPath = path.resolve("setmenu.json");

    let prefixes = {};
    if (fs.existsSync(prefixPath)) {
      prefixes = JSON.parse(fs.readFileSync(prefixPath, "utf-8"));
    }

    const usedPrefix = prefixes[subbotID] || ".";

    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: "🤍", key: msg.key }
    });

    let customData = {};
    if (fs.existsSync(menuConfigPath)) {
      customData = JSON.parse(fs.readFileSync(menuConfigPath, "utf8"));
    }

    const personal = customData[subbotID];
    const imageBuffer = personal?.imagen ? Buffer.from(personal.imagen, "base64") : null;
    const nombreMenu = personal?.nombre || "🤍 sumi sakurasawa 🤍`";

    let caption = "";
    let footer = "";

    if (personal) {
  // MENÚ PERSONALIZADO DISEÑO BONITO
  caption = `

  ❀ NOMBRE: *${nombreMenu}*
  ❀ CHANNEL:https://whatsapp.com/channel/0029Vagdmfv1SWt5nfdR4z3w

»  ⊹˚୨ •(=^●ω●^=)• *EDITAR*  ❀

✎ ${usedPrefix}𝘴𝘦𝘵𝘱𝘳𝘦𝘧𝘪𝘹 / ${usedPrefix}𝘱𝘪𝘯𝘨
✎ ${usedPrefix}𝘤𝘳𝘦𝘢𝘥𝘰𝘳 / ${usedPrefix}𝘨𝘦𝘵
✎ ${usedPrefix}𝘢𝘥𝘥𝘭𝘪𝘴𝘵𝘢 / ${usedPrefix}𝘥𝘦𝘭𝘭𝘪𝘴𝘵𝘢
✎ ${usedPrefix}𝘢𝘥𝘥𝘨𝘳𝘶𝘱𝘰 / ${usedPrefix}𝘥𝘦𝘭𝘨𝘳𝘶𝘱𝘰
✎ ${usedPrefix}setmenu
✎ ${usedPrefix}delmenu

  »  ⊹˚୨ •(=^●ω●^=)• *IA*  ❀   

> ❀ ${usedPrefix}𝘤𝘩𝘢𝘵𝘨𝘱𝘵
> ❀ ${usedPrefix}𝘨𝘦𝘮𝘪𝘯𝘪𝘴

 »  ⊹˚୨ •(=^●ω●^=)• *Descargas*  ❀         

 ✎ ${usedPrefix}𝘱𝘭𝘢𝘺 / ${usedPrefix}play2
> son en documentos
  ${usedPrefix}𝘱𝘭𝘢𝘺audio / ${usedPrefix}playvideo
> estos son normales 
 ✎ ${usedPrefix}𝘺𝘵𝘮𝘱3 / ${usedPrefix}𝘺𝘵𝘮𝘱4
> son normales 
 ✎ ${usedPrefix}ytmp3doc / ${usedPrefix}ytmp4𝘥𝘰𝘤
estos son en documento 
 ✎ ${usedPrefix}𝘢𝘱𝘬 / ${usedPrefix}𝘧𝘣 / ${usedPrefix}𝘪𝘨 / ${usedPrefix}𝘵𝘵

 »  ⊹˚୨ •(=^●ω●^=)• *MULTIMEDIA*  ❀  
    
✎ ${usedPrefix}𝘴 / ${usedPrefix}𝘷𝘦𝘳 / ${usedPrefix}𝘩𝘥
✎ ${usedPrefix}𝘵𝘰𝘪𝘮𝘨 / ${usedPrefix}𝘵𝘰𝘢𝘶𝘥𝘪𝘰 / ${usedPrefix}𝘵𝘵𝘴
✎ ${usedPrefix}𝘸𝘩𝘢𝘵𝘮𝘶𝘴𝘪𝘤 / ${usedPrefix}𝘱𝘦𝘳𝘧𝘪𝘭

 »  ⊹˚୨ •(=^●ω●^=)• *grupos*  ❀ 
  
✎ ${usedPrefix}𝘢𝘣𝘳𝘪𝘳𝘨𝘳𝘶𝘱𝘰 / ${usedPrefix}𝘤𝘦𝘳𝘳𝘢𝘳𝘨𝘳𝘶𝘱𝘰
✎ ${usedPrefix}𝘪𝘯𝘧𝘰𝘨𝘳𝘶𝘱𝘰 / ${usedPrefix}𝘬𝘪𝘤𝘬
✎ ${usedPrefix}𝘮𝘰𝘥𝘰𝘢𝘥𝘮𝘪𝘯𝘴 on/off
✎ ${usedPrefix}𝘢𝘯𝘵𝘪𝘭𝘪𝘯𝘬 on/off
✎ ${usedPrefix}𝘸𝘦𝘭𝘤𝘰𝘮𝘦 on/off
✎ ${usedPrefix}𝘵𝘢𝘨𝘢𝘭𝘭 / ${usedPrefix}𝘵𝘰𝘥𝘰𝘴
✎ ${usedPrefix}𝘥𝘢𝘮𝘦𝘭𝘪𝘯𝘬 / ${usedPrefix}𝘢𝘯𝘵𝘪𝘥𝘦𝘭𝘦𝘵𝘦

»  ⊹˚୨ •(=^●ω●^=)• *JUEGOS*  ❀ 
    
✎ ${usedPrefix}𝘬𝘪𝘴𝘴 / ${usedPrefix}𝘴𝘭𝘢𝘱
✎ ${usedPrefix}𝘵𝘰𝘱𝘬𝘪𝘴𝘴 / ${usedPrefix}𝘵𝘰𝘱𝘴𝘭𝘢𝘱
✎ ${usedPrefix}𝘷𝘦𝘳𝘥𝘢𝘥 / ${usedPrefix}𝘳𝘦𝘵𝘰`.trim();
    } else {
      // MENÚ POR DEFECTO NORMALITO
      caption = `
╔⌬${nombreMenu}⌬╗
║   Menú por categorías  
╚═─────────────═╝

〔 👇Haz Que Tus Amigos Sean *SUBBOTS* También Diles Que Envíen Estos Comandos👇 〕
⚘ ${usedPrefix}serbot / qr
⚘ ${usedPrefix}code / codigo 
⚘ ${usedPrefix}sercode / codigo

〔 AI & Respuestas 〕
⚘ ${usedPrefix}chatgpt
⚘ ${usedPrefix}geminis

〔 Descargas 〕
⚘ ${usedPrefix}play / ${usedPrefix}playdoc
⚘ ${usedPrefix}play2 / ${usedPrefix}play2doc
⚘ ${usedPrefix}play5 ${usedPrefix}play6
⚘ ${usedPrefix}ytmp3 / ${usedPrefix}ytmp3doc
⚘ ${usedPrefix}ytmp35
⚘ ${usedPrefix}ytmp4 / ${usedPrefix}ytmp4doc
⚘ ${usedPrefix}ytmp45
⚘ ${usedPrefix}apk
⚘ ${usedPrefix}instagram / ${usedPrefix}ig
⚘ ${usedPrefix}tiktok / ${usedPrefix}tt
⚘ ${usedPrefix}facebook / ${usedPrefix}fb

〔 Stickers & Multimedia 〕
⚘ ${usedPrefix}s
⚘ ${usedPrefix}ver
⚘ ${usedPrefix}toaudio 
⚘ ${usedPrefix}hd
⚘ ${usedPrefix}toimg
⚘ ${usedPrefix}whatmusic
⚘ ${usedPrefix}tts
⚘ ${usedPrefix}perfil

〔 Grupos 〕
⚘ ${usedPrefix}abrirgrupo
⚘ ${usedPrefix}cerrargrupo
⚘ ${usedPrefix}infogrupo
⚘ ${usedPrefix}kick
⚘ ${usedPrefix}modoadmins on o off
⚘ ${usedPrefix}antilink on o off
⚘ ${usedPrefix}welcome on o off
⚘ ${usedPrefix}tag
⚘ ${usedPrefix}tagall / ${usedPrefix}invocar / ${usedPrefix}todos
⚘ ${usedPrefix}infogrupo
⚘ ${usedPrefix}damelink
⚘ ${usedPrefix}antidelete on o off

〔 Comandos De Juegos 〕
⚘ ${usedPrefix}verdad
⚘ ${usedPrefix}reto
⚘ ${usedPrefix}memes o meme
⚘ ${usedPrefix}kiss
⚘ ${usedPrefix}topkiss
⚘ ${usedPrefix}slap
⚘ ${usedPrefix}topslap

〔 Configuración & Dueño 〕
⚘ ${usedPrefix}antideletepri on o off
⚘ ${usedPrefix}setprefix ↷ 
   Cambiar prefijo del subbot
⚘ ${usedPrefix}creador ↷ 
    Contacto del creador
⚘ ${usedPrefix}get ↷ 
    Descargar estados
⚘ ${usedPrefix}addgrupo ↷ 
    Autorizar grupo pa que lo usen.
⚘ ${usedPrefix}addlista ↷
   Autorizar usuario privado pa lo usen.
⚘ ${usedPrefix}dellista ↷
   Quitar usuario autorizado pa que no lo usen.
⚘ ${usedPrefix}delgrupo ↷ 
   Eliminar grupo autorizado pa que no lo usen.
⚘ ${usedPrefix}ping ↷ 
   Medir latencia del bot
⚘ ${usedPrefix}setmenu↷
  personaliza tu subbot
⚘ ${usedPrefix}delmenu↷
   quita lo personalizado

═⌬ CORTANA 2.0 Subbot ⌬═`.trim();
    }

    await conn.sendMessage(
      msg.key.remoteJid,
      {
        image: imageBuffer ? imageBuffer : { url: `https://cdn.russellxz.click/139f04e1.jpeg` },
        caption,
      },
      { quoted: msg }
    );

    await conn.sendMessage(msg.key.remoteJid, {
      react: { text: "✅", key: msg.key }
    });

  } catch (err) {
    console.error("❌ Error en el menú:", err);
    await conn.sendMessage(msg.key.remoteJid, {
      text: "❌ Ocurrió un error mostrando el menú.",
      quoted: msg
    });
  }
};

handler.command = ['menu', 'help', 'ayuda', 'comandos'];
module.exports = handler;
