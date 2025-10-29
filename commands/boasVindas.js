// commands/boasVindas.js
async function boasVindas(event, client) {
    const chat = await client.getChatById(event.id._serialized);

    // Checa se a ação foi adicionar participante
    if (event.action === "add") {
        for (let participante of event.participants) {
            // Mensagem no grupo
            await chat.sendMessage("👋 Olá, bem-vindo(a) ao grupo! Aproveite os eventos e atividades!✨✨✨\n\n Pedimos a gentileza de que leia as regras do grupo na descrição.\n\n Deus abençoe! 🙏🏻🙏🏻🙏🏻");

            // Mensagem privada
            await client.sendMessage(
                participante,
                `👋 Olá! Seja bem-vindo(a) ao grupo da Mocidade 015! Espero que aproveite os eventos e atividades.✨`
            );
        }
    }
}

module.exports = { boasVindas };
