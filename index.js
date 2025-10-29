const fs = require('fs');
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({ authStrategy: new LocalAuth() });

// Carregar comandos
const commands = {};
fs.readdirSync('./commands').forEach(file => {
    if(file.endsWith('.js')){
        const command = require(`./commands/${file}`);
        commands[command.name] = command;
    }
});


client.on('qr', qr => qrcode.generate(qr, { small: true }));
client.on('ready', () => console.log("🤖 Bot pronto!"));

// Listener de mensagens
client.on('message', async msg => {
    const texto = msg.body.toLowerCase().trim();
    if(!texto.startsWith("!")) return;
    const comando = texto.slice(1);

    // Checa se é mensagem de grupo e se o bot é admin
    const chat = await msg.getChat();

    if(msg.isGroupMsg) {

        // Mensagem de grupo → checa se o bot é admin
        const botNumber = client.info.wid._serialized;
        const botIsAdmin = chat.participants.find(p => p.id._serialized === botNumber && p.isAdmin);
        if(!botIsAdmin) return; // só executa se for admin
    }

    // Executa o comando se existir
    if(commands[comando]) commands[comando].execute(msg);
});

client.initialize();
