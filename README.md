# 🤖 Bot de WhatsApp - JavaScript (whatsapp-web.js)

Um bot simples para WhatsApp, desenvolvido em **JavaScript** com a biblioteca [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js).  
Ele se conecta ao WhatsApp Web através de um QR Code e pode ser usado em **grupos ou conversas privadas**.

---

## 🚀 Funcionalidades
- Responde automaticamente a comandos pré-definidos.
- Mantém a sessão ativa com **autenticação local** (sem precisar escanear o QR toda vez).
- Pode ser adicionado a grupos do WhatsApp.
- Fácil de personalizar e expandir.

---

## ⚙️ Tecnologias Utilizadas
- **Node.js**
- **whatsapp-web.js**
- **qrcode-terminal**

---

## 📦 Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/vinnisntos/MEU-BOT.git
   cd MEU-BOT



2. Instale as dependências:

npm install


3. Execute o bot:

node index.js


4. Escaneie o QR Code com o número de WhatsApp que será o bot.



💬 Comandos Padrão


Comando	Resposta
!ping	🏓 Pong!
!oi	👋 Oi! Tudo bem?



🧩 Exemplo de Código
client.on('message', async (msg) => {
  if (msg.body.toLowerCase() === '!ping') {
    await msg.reply('🏓 Pong!');
  }

  if (msg.body.toLowerCase() === '!oi') {
    await msg.reply('Oi! Tudo bem? 👋');
  }
});



👨‍💻 Autor

Desenvolvido por Vinnícius Gabriel Matos Dos Santos
📍 Projeto aberto para aprendizado e aprimoramento.
💡 Sinta-se à vontade para contribuir!
Desenvolvido por Vinnícius Gabriel Matos Dos Santos
📍 Projeto aberto para aprendizado e aprimoramento.
💡 Sinta-se à vontade para contribuir!


