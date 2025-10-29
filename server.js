const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

// Serve a pasta atual
app.use(express.static(__dirname));

// Rota específica para o QR Code
app.get("/qrcode.png", (req, res) => {
    res.sendFile(path.join(__dirname, "qrcode.png"));
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
