// commands/saida.js
async function despedida(event, client) {
    if (event.action === "remove") {
        for (let participante of event.participants) {
            await client.sendMessage(
                participante,
                `😢 Sentiremos sua falta! Esperamos te ver em breve nos próximos eventos do grupo. -CCB-015 BOT`
            );
        }
    }
}

module.exports = { despedida };
