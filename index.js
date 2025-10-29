const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const { cadastrarEvento } = require("./commands/cadastroEventos");
const { listarEventos } = require("./commands/listarEventos");
const { boasVindas } = require("./commands/boasVindas");
const { despedida } = require("./commands/saida");


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

// depois de client.on("ready")
client.on("group_participants_update", async (event) => {
    boasVindas(event, client);
});

// Listener de grupo
client.on("group_participants_update", async (event) => {
    if (event.action === "add") {
        boasVindas(event, client);
    } else if (event.action === "remove") {
        despedida(event, client);
    }
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
