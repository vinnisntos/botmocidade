const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Serve a pasta atual como pública
app.use(express.static(__dirname));

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
