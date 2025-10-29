const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const { cadastrarEvento } = require("./commands/cadastroEventos");
const { listarEventos } = require("./commands/listarEventos");
const { boasVindas } = require("./commands/boasVindas");
const { despedida } = require("./commands/saida");

const express = require("express");
const QRCode = require("qrcode");

const app = express();
const port = process.env.PORT || 3000;

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

let lastQr = null;

client.on("qr", (qr) => {
    console.log("Escaneie este QR Code no WhatsApp:");
    qrcode.generate(qr, { small: true });
    lastQr = qr; // guarda o QR mais recente
});

// Serve QR dinamicamente
app.get("/qrcode.png", async (req, res) => {
    if (!lastQr) return res.status(404).send("QR Code ainda não gerado");
    try {
        const img = await QRCode.toBuffer(lastQr, { type: "png", scale: 8 });
        res.type("png");
        res.send(img);
    } catch (err) {
        res.status(500).send("Erro ao gerar QR Code");
    }
});

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

client.on("ready", () => {
    console.log("🤖 Bot pronto!");
});

client.on("group_participants_update", async (event) => {
    if (event.action === "add") {
        boasVindas(event, client);
    } else if (event.action === "remove") {
        despedida(event, client);
    }
});

client.on("message", (msg) => {
    const texto = msg.body.toLowerCase().trim();
    if (texto.startsWith("/cadastro")) {
        cadastrarEvento(msg, client);
    } else if (texto.startsWith("/eventos")) {
        listarEventos(msg, client);
    }
});

client.initialize();
