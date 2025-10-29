const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const { cadastrarEvento } = require("./commands/cadastroEvento");
const { listarEventos } = require("./commands/listarEventos");

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on("qr", (qr) => {
    console.log("Escaneie este QR Code no WhatsApp:");
    qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
    console.log("🤖 Bot pronto!");
});

client.on("message", (msg) => {
    const texto = msg.body.toLowerCase().trim();

    // Comandos privados
    if (texto.startsWith("/cadastro")) {
        cadastrarEvento(msg, client);
    } else if (texto.startsWith("/eventos")) {
        listarEventos(msg, client);
    }
});

client.initialize();
