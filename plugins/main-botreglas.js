let handler = async (m, { conn, usedPrefix, command}) => {

let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }

let megu = `🩵 *REGLAS DE LA BOT*\n\n
✰ No llamar A la Bot
✰ No hacer spam
✰ Contacta al creador si es necesario
✰ Pedir permiso para añadir al bot a un grupo

✨ 𝗡𝗼𝘁𝗮: *Si no cumples con las reglas del bot, te bloquearé.*

⚠️ 𝗔𝘃𝗶𝘀𝗼: *Puedes apoyarnos siguendo el canal oficial de la bot.*

${global.md}`.trim()
await conn.reply(m.chat, megu, m, fake)

}
handler.help = ['botreglas']
handler.tags = ['main']
handler.command = ['botreglas', 'reglasdelbot', 'reglasbot', 'reglas']
handler.register = true
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}
