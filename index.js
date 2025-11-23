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
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
    }
});

let lastQr = null;

// Evento QR
client.on("qr", (qr) => {
    console.log("Escaneie este QR Code no WhatsApp:");
    qrcode.generate(qr, { small: true });
    lastQr = qr; // guarda o QR mais recente
});

// Servir QR dinamicamente
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

// Inicia servidor Express
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

// Bot pronto
client.on("ready", () => {
    console.log("🤖 Bot pronto!");
});

// kboas vindas
client.on("group_join", async (event) => {
    await boasVindas(event, client);
});

// Comandos de mensagens
client.on("message", (msg) => {
    const texto = msg.body.toLowerCase().trim();
    if (texto.startsWith("/cadastro")) {
        cadastrarEvento(msg, client);
    } else if (texto.startsWith("/eventos")) {
        listarEventos(msg, client);
    }
});

client.initialize();
