import {generateWAMessageFromContent} from '@whiskeysockets/baileys';
import {smsg} from '../lib/simple.js';
import {format} from 'util';
import {fileURLToPath} from 'url';
import path, {join} from 'path';
import {unwatchFile, watchFile} from 'fs';
import fs from 'fs';
import chalk from 'chalk';
import ws from 'ws';

const { proto } = (await import('@whiskeysockets/baileys')).default
const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(function () {
  clearTimeout(this)
  resolve()
}, ms))

const normalizeJid = jid => jid?.replace(/[^0-9]/g, '')
const cleanJid = jid => jid?.split(':')[0] || ''

export async function handler(chatUpdate) {
  this.msgqueque = this.msgqueque || []
  this.uptime = this.uptime || Date.now()
  if (!chatUpdate)
    return
  this.pushMessage(chatUpdate.messages).catch(console.error)
  let m = chatUpdate.messages[chatUpdate.messages.length - 1]
  if (!m)
    return;
  if (global.db.data == null)
    await global.loadDatabase()       
  try {
    m = smsg(this, m) || m
    if (!m)
      return
    global.mconn = m 
    m.exp = 0
    m.chocolates = false
    try {
      let user = global.db.data.users[m.sender]
      if (typeof user !== 'object')
        global.db.data.users[m.sender] = {}
      if (user) {
        if (!isNumber(user.exp)) user.exp = 0
        if (!('premium' in user)) user.premium = false
        if (!('muto' in user)) user.muto = false
        if (!isNumber(user.joincount)) user.joincount = 1
        if (!isNumber(user.money)) user.money = 150
        if (!isNumber(user.chocolates)) user.chocolates = 10
        if (!('registered' in user)) user.registered = false

        if (!user.registered) {
          if (!('name' in user)) user.name = m.name
          if (!('age' in user)) user.age = 0
          if (!isNumber(user.regTime)) user.regTime = -1
        }

        if (!isNumber(user.afk)) user.afk = -1
        if (!('role' in user)) user.role = 'Nuv'
        if (!isNumber(user.bank)) user.bank = 0
        if (!isNumber(user.coin)) user.coin = 0
        if (!isNumber(user.diamond)) user.diamond = 3
        if (!isNumber(user.exp)) user.exp = 0
        if (!isNumber(user.lastadventure)) user.lastadventure = 0
        if (!isNumber(user.lastcoins)) user.lastcoins = 0    
        if (!isNumber(user.lastclaim)) user.lastclaim = 0
        if (!isNumber(user.lastcode)) user.lastcode = 0
        if (!isNumber(user.lastcofre)) user.lastcofre = 0
        if (!isNumber(user.lastcodereg)) user.lastcodereg = 0
        if (!isNumber(user.lastdiamantes)) user.lastdiamantes = 0    
        if (!isNumber(user.lastdu10,
          money: 100,
          muto: false,
          premium: false,
          premiumTime: 0,
          registered: false,
          regTime: -1,
          rendang: 0, 
        }
      let akinator = global.db.data.users[m.sender].akinator
      if (typeof akinator !== 'object')
        global.db.data.users[m.sender].akinator = {}
      if (akinator) {
        if (!('sesi' in akinator)) akinator.sesi = false
        if (!('server' in akinator)) akinator.server = null
        if (!('frontaddr' in akinator)) akinator.frontaddr = null
        if (!('session' in akinator)) akinator.session = null
        if (!('signature' in akinator)) akinator.signature = null
        if (!('question' in akinator)) akinator.question = null
        if (!('progression' in akinator)) akinator.progression = null
        if (!('step' in akinator)) akinator.step = null
        if (!('soal' in akinator)) akinator.soal = null
      } else
        global.db.data.users[m.sender].akinator = {
          sesi: false,
          server: null,
          frontaddr: null,
          session: null,
          signature: null,
          question: null,
          progression: null,
          step: null, 
          soal: null
        }                   
      let chat = global.db.data.chats[m.chat]
      if (typeof chat !== 'object')
        global.db.data.chats[m.chat] = {}

      if (chat) {
        if (!('isBanned' in chat)) chat.isBanned = false         
        if (!('welcome' in chat)) chat.welcome = true 
        if (!('autoresponder' in chat)) chat.autoresponder = false          
        if (!('detect' in chat)) chat.detect = true               
        if (!('sWelcome' in chat)) chat.sWelcome = ''          
        if (!('sBye' in chat)) chat.sBye = ''                    
        if (!('sPromote' in chat)) chat.sPromote = ''             
        if (!('sDemote' in chat)) chat.sDemote = ''
        '' 
        if (!('sCondition' in chat)) chat.sCondition = JSON.stringify([{ grupo: { usuario: [], condicion: [], admin: '' }, prefijos: []}])                   
        if (!('nsfw' in chat)) chat.nsfw = false
        if (!('autoAceptar' in chat)) chat.autoAceptar = false                     
        if (!('antiLink' in chat)) chat.antiLink = false              
        if (!('modoadmin' in chat)) chat.modoadmin = false    
        if (!isNumber(chat.expired)) chat.expired = 0
      } else
        global.db.data.chats[m.chat] = {
          isBanned: false,
          welcome: true,
          detect: true,
          sWelcome: '',
          sBye: '',
          sPromote: '',
          sDemote: '', 
          sAutoresponder: '',
          sCondition: JSON.stringify([{ grupo: { usuario: [], condicion: [], admin: '' }, prefijos: []}]), 
          autoresponder: false,
          autoAceptar: false,
          nsfw: false,
          antiLink: false,
          modoadmin: false,
          expired: 0,
        }
      let settings = global.db.data.settings[this.user.jid]
 {
        if (!('self' in settings)) settings.self = false
        if (!('autoread' in settings)) settings.autoread = false
        if (!('restrict' in settings)) settings.restrict = false
        if (!('jadibotmd' in settings)) settings.jadibotmd = false  
        if (!('botcommandCount' in settings)) settings.botcommandCount = 0
      } else global.db.data.settings[this.user.jid] = {
        self: false,
        autoread: false,
        restrict: false, 
        jadibotmd: true,
        botcommandCount: 0,
      }
    } catch (e) {
      console.error(e)
    }

    // @lid error fixed by I'm Fz and Dioneibi ~
    const groupMetadata = (m.isGroup ? ((conn.chats[m.chat] || {}).metadata || await this.groupMetadata(m.chat).catch(_ => null)) : {}) || {}
    const participants = (m.isGroup ? groupMetadata.participants : []) || []
    const senderNum = normalizeJid(m.sender)
    const botNums = [this.user.jid, this.user.lid].map(j => normalizeJid(cleanJid(j)))
    const user = m.isGroup 
      ? participants.find(u => normalizeJid(u.id) === senderNum) 
      : {}
    const bot = m.isGroup 
      ? participants.find(u => botNums.includes(normalizeJid(u.id))) 
      : {}
    const isRAdmin = user?.admin === 'superadmin' || false
    const isAdmin = isRAdmin || user?.admin === 'admin' || false
    const isBotAdmin = !!bot?.admin

    const isROwner = [conn.decodeJid(global.conn.user.id), ...global.owner.map(([number]) => number)]
      .map(v => normalizeJid(v))
      .includes(senderNum)
    const isOwner = isROwner || m.fromMe
    const _user = global.db.data && global.db.data.users && global.db.data.users[m.sender]
    const isPrems = isROwner || _user?.premium === true || _user?.premiumTime > 0

    if (opts['queque'] && m.text && !(isPrems)) {
      let queque = this.msgqueque, time = 1000 * 5
      const previousID = queque[queque.length - 1]
      queque.push(m.id || m.key.id)
      setInterval(async function () {
        if (queque.indexOf(previousID) === -1) clearInterval(this)
        await delay(time)
      }, time)
    }
    m.exp += Math.ceil(Math.random() * 10)
    let usedPrefix


    const ___dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), './plugins')
    for (let name in global.plugins) {
      let plugin = global.plugins[name]
      if (!plugin) continue
      if (plugin.disabled) continue
      const __filename = join(___dirname, name)
      if (typeof plugin.all === 'function') {
        try {
          await plugin.all.call(this, m, {
            chatUpdate,
            __dirname: ___dirname,
            __filename
          })
        } catch (e) {
          console.error(e)
        }
      }
      if (!opts['restrict'])
        if (plugin.tags && plugin.tags.includes('admin')) {
          continue
        }
      const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
      let _prefix = plugin.customPrefix ? plugin.customPrefix : conn.prefix ? conn.prefix : global.prefix
      let match = (_prefix instanceof RegExp ?
        [[_prefix.exec(m.text), _prefix]] :
        Array.isArray(_prefix) ?
          _prefix.map(p => {
            let re = p instanceof RegExp ?
              p :
              new RegExp(str2Regex(p))
            return [re.exec(m.text), re]
          }) :
          typeof _prefix === 'string' ?
            [[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]] :
            [[[], new RegExp]]
      ).find(p => p[1])
      if (typeof plugin.before === 'function') {
        if (await plugin.before.call(this, m, {
          match,
          conn: this,
          participants,
          groupMetadata,
          user,
          bot,
          isROwner,
          isOwner,
          isRAdmin,
          isAdmin,
          isBotAdmin,
          isPrems,
          chatUpdate,
          __dirname: ___dirname,
          __filename
        }))
          continue
      }
      if (typeof plugin !== 'function')
        continue
      if ((usedPrefix = (match[0] || '')[0])) {
        let noPrefix = m.text.replace(usedPrefix, '')
        let [command, ...args] = noPrefix.trim().split` `.filter(v => v)
        args = args || []
        let _args = noPrefix.trim().split` `.slice(1)
        let text = _args.join` `
        command = (command || '').toLowerCase()
        let fail = plugin.fail || global.dfail // When failed
        let isAccept = plugin.command instanceof RegExp ?
          plugin.command.test(command) :
          Array.isArray(plugin.command) ?
            plugin.command.some(cmd => cmd instanceof RegExp ?
              cmd.test(command) :
              cmd === command
            ) :
            typeof plugin.command === 'string' ?
              plugin.command === command :
              false

        if (!isAccept) {
          continue
        }

        global.db.data.settings[this.user.jid].botcommandCount += 1

        m.plugin = name
        if (m.chat in global.db.data.chats || m.sender in global.db.data.users) {
          let chat = global.db.data.chats[m.chat]
          let user = global.db.data.users[m.sender]
          if (!['owner-unbanchat.js'].includes(name) && chat && chat.isBanned && !isROwner) return // Except this
          if (name != 'owner-unbanchat.js' && name != 'owner-exec.js' && name != 'owner-exec2.js' && name != 'tool-delete.js' && chat?.isBanned && !isROwner) return
          if (user.antispam > 2) return
          if (m.text && user.banned && !isROwner) {
            m.reply(`🚫 El usuario está baneado(a), no puede usar los comandos de la bot!\n\n${user.bannedReason ? `\n💌 *Motivo:* 
${user.bannedReason}` : '💌 *Motivo:* Sin no especificado'}\n\n🩵 *Si este bot es cuenta oficial y tiene evidencia que respalde que este mensaje es un error, puede exponer su caso en:*\n\n🤍 ${asistencia}`)
            user.antispam++
            return
          }

          if (user.antispam2 && isROwner) return
          let time = global.db.data.users[m.sender].spam + 3000
          if (new Date - global.db.data.users[m.sender].spam < 3000) return console.log(`[ SPAM ]`)
          global.db.data.users[m.sender].spam = new Date * 1

          if ((m.id.startsWith('NJX-') || (m.id.startsWith('BAE5') && m.id.length === 16) || (m.id.startsWith('B24E') && m.id.length === 20))) return

          if (opts['nyimak']) return;
          if (!isROwner && opts['self']) return;
          if (opts['pconly'] && m.chat.endsWith('g.us')) return;
          if (opts['gconly'] && !m.chat.endsWith('g.us')) {
            const allowedInPrivateForUsers = ['serbot', 'serbot --code', 'menu', 'info'];
            if (!isOwner && !allowedInPrivateForUsers.includes(command)) {
              return
            }
          }
          if (opts['swonly'] && m.chat !== 'status@broadcast') return;
          if (typeof m.text !== 'string') m.text = '';

          if (m.isBaileys) {
            return
          }
        }

        let hl = _prefix
        let adminMode = global.db.data.chats[m.chat].modoadmin
        let mini = `${plugins.botAdmin || plugins.admin || plugins.group || plugins || noPrefix || hl || m.text.slice(0, 1) == hl || plugins.command}`
        if (adminMode && !isOwner && !isROwner && m.isGroup && !isAdmin && mini) return
        if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) {
          fail('owner', m, this)
          continue
        }
        if (plugin.rowner && !isROwner) {
          fail('rowner', m, this)
          continue
        }
        if (plugin.owner && !isOwner) {
          fail('owner', m, this)
          continue
        }
        if (plugin.premium && !isPrems) {
          fail('premium', m, this)
          continue
        } else if (plugin.botAdmin && !isBotAdmin) {
          fail('botAdmin', m, this)
          continue
        } else if (plugin.admin && !isAdmin) {
          fail('admin', m, this)
          continue
        }
        if (plugin.private && m.isGroup) {
          fail('private', m, this)
          continue
        }
        if (plugin.register == true && _user.registered == false) {
          fail('unreg', m, this)
          continue
        }

        m.isCommand = true
        let xp = 'exp' in plugin ? parseInt(plugin.exp) : 10
        if (plugin.money && global.db.data.users[m.sender].money < plugin.money * 1) {
          m.reply(`No tienes suficientes Diamantes💎 para usar este comando...`)
          continue
        }

        m.exp += xp
        if (plugin.chocolates && global.db.data.users[m.sender].chocolates < plugin.chocolates * 1) {
          m.reply(`No tienes suficientes Diamantes💎  para usar este comando...`)
          continue
        }

        if (plugin.level > _user.level) {
          m.reply(`No cuentas con nivel suficiente para usar este comando...`)
          continue
        }

        let extra = {
          match,
          usedPrefix,
          noPrefix,
          _args,
          args,
          command,
          text,
          conn: this,
          participants,
          groupMetadata,
          user,
          bot,
          isROwner,
          isOwner,
          isRAdmin,
          isAdmin,
          isBotAdmin,
          isPrems,
          chatUpdate,
          __dirname: ___dirname,
          __filename
        }
        try {
          await plugin.call(this, m, extra)
          m.chocolates = m.chocolates || plugin.chocolates || false
          m.money = m.money || plugin.money || false
        } catch (e) {
          // Error occured
          m.error = e
          console.error(e)
          if (e) {
            let text = format(e)
            // for (let key of Object.values(global.APIKeys))
            text = text.replace(new RegExp(key, 'g'), 'Admin')
            if (e.name)
              /*for (let [jid] of global.owner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
                let data = (await conn.onWhatsApp(jid))[0] || {}
                if (data.exists)
                  m.reply(`⧋〘📕 𝗘𝗥𝗥𝗢𝗥 │ 𝗙𝗔𝗟𝗟𝗢 📕〙⧋\n\n❒ 𝗘𝗥𝗥𝗢𝗥:\n\`\`\`${format(e)}\`\`\`\n`.trim(), data.jid)
              }*/
              m.reply(text)
          }
        } finally {

          if (typeof plugin.after === 'function') {
            try {
              await plugin.after.call(this, m, extra)
            } catch (e) {
              console.error(e)
            }
          }
          if (m.chocolates)
            conn.reply(m.chat, `✰ 𝐇𝖺𝗌 𝗀𝖺𝘀𝗍𝖺𝗱𝗈 *${+m.chocolates}* 𝖽𝗂𝖺𝗆𝖺𝗇𝗍𝖾𝗌 ᰍ💎☜︎︎︎`, m)
        }
        if (m.money)
          conn.reply(m.chat, `✰ 𝐇𝖺𝗌 𝗀𝖺𝘀𝗍𝖺𝗱𝗈 *${+m.money}* 𝖽𝗂𝖺𝗆𝖺𝗇𝗍𝖾𝗌 ᰍ💎☜︎︎︎`, m)
        break
      }
    }
  } catch (e) {
    console.error(e)
  } finally {
    if (opts['queque'] && m.text) {
      const quequeIndex = this.msgqueque.indexOf(m.id || m.key.id)
      if (quequeIndex !== -1)
        this.msgqueque.splice(quequeIndex, 1)
    }
    //console.log(global.db.data.users[m.sender])
    let user, stats = global.db.data.stats
    if (m) {
      if (m.sender && (user = global.db.data.users[m.sender])) {
        user.exp += m.exp
        user.chocolates -= m.chocolates * 1
        user.money -= m.money * 1
      }

      let now = +new Date
        if (m.plugin in stats) {
          stat = stats[m.plugin]
          if (!isNumber(stat.total))
            stat.total = 1
          if (!isNumber(stat.success))
            stat.success = m.error != null ? 0 : 1
          if (!isNumber(stat.last))
            stat.last = now
          if (!isNumber(stat.lastSuccess))
            stat.lastSuccess = m.error != null ? 0 : now
        } else
          stat = stats[m.plugin] = {
            total: 1,
            success: m.error != null ? 0 : 1,
            last: now,
            lastSuccess: m.error != null ? 0 : now
          }
        stat.total += 1
        stat.last = now
        if (m.error == null) {
          stat.success += 1
          stat.lastSuccess = now
        }
      }
    }

    try {
      if (!opts['noprint']) await (await import(`../lib/print.js`)).default(m, this)
    } catch (e) {
      console.log(m, m.quoted, e)
    }
    let settingsREAD = global.db.data.settings[this.user.jid] || {}  
    if (opts['autoread']) await this.readMessages([m.key])
  }
}

global.dfail = (type, m, conn) => {
  const msg = {
    rowner: '「🩵」 *Este comando solo puede ser usado por mi creador*\n\n> Félix Manuel.', 
    owner: '「🩵」 *Este comando solo puede ser usado por mis desarrolladores.', 
    premium: '「🩵」 *Este comando solo es para usuarios Premium.',  
    private: '「🩵」 *Este comando solo puede ser usado en chats privados.*', 
    admin: '「🩵」 *Este comando solo puede ser usado por los admins.*', 
    botAdmin: '「🩵」 *Para usar este comando debo ser admin del grupo.*', 
    unreg: '「🩵」 *¡Hey! no estas registrado, registrate para usar mis comandos*\n\n*/reg nombre.edad*\n\n*_❕ Ejemplo_* : */reg Félix.13*',
    restrict: '「🩵」 *Esta característica esta desactivada.*'
  }[type];
  if (msg) return conn.reply(m.chat, msg, m, rcanal).then(_ => m.react('✖️'))
}