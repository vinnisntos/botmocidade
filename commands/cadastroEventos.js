const fs = require("fs");
const path = require("path");
const eventosPath = path.join(__dirname, "../data/eventos.json");

const tiposEvento = ["BTM", "CPJ", "RDM", "RDJ", "COF"];
const congregacoes = [
  "Vila Santana", "Vila Gabriel", "Éden", "Jardim Simus",
  "Nova Esperança", "Votorantim", "Central", "Ipanema",
  "Jardim Tatiana", "Wanel Ville"
];
const horarios = { MANHÃ: "10:00", TARDE: ["14:00", "14:30"], NOITE: { DOMINGO: "18:30", OUTROS: "19:30" } };

async function cadastrarEvento(msg, client) {
    const chatId = msg.from; 

    await client.sendMessage(chatId, "Selecione o tipo de evento:\n1️⃣ BTM\n2️⃣ CPJ\n3️⃣ RDM\n4️⃣ RDJ\n5️⃣ COF");
    const tipo = await esperarResposta(chatId, client);
    const tipoSelecionado = tiposEvento[tipo - 1];

    await client.sendMessage(chatId, `Selecione o bairro:\n${congregacoes.map((c,i)=>`${i+1}️⃣ ${c}`).join("\n")}`);
    const bairro = await esperarResposta(chatId, client);
    const congregacaoSelecionada = congregacoes[bairro-1];

    await client.sendMessage(chatId, "Selecione o horário:\n1️⃣ Manhã\n2️⃣ Tarde\n3️⃣ Noite");
    const horarioEscolha = await esperarResposta(chatId, client);
    let horario = horarioEscolha==="1"?horarios.MANHÃ:horarioEscolha==="2"?horarios.TARDE[0]:horarios.NOITE.OUTROS;

    await client.sendMessage(chatId, "Digite a data do evento (DD/MM/AAAA):");
    const data = await esperarResposta(chatId, client);
    const dataFormatada = formatarData(data);
    if(!dataFormatada){await client.sendMessage(chatId,"⚠️ Data inválida"); return;}

    const eventos = lerEventos();
    const duplicado = eventos.find(e=>e.tipo===tipoSelecionado && e.data===dataFormatada && e.congregacao===congregacaoSelecionada);
    if(duplicado){await client.sendMessage(chatId,"⚠️ Evento já cadastrado"); return;}

    await client.sendMessage(chatId, `Confirme os dados:\n📅 ${dataFormatada}\n🏠 ${congregacaoSelecionada}\n📘 ${tipoSelecionado}\n🕐 ${horario}\n\n1️⃣ Confirmar\n2️⃣ Cancelar`);
    const confirmar = await esperarResposta(chatId, client);

    if(confirmar==="1"){
        eventos.push({tipo: tipoSelecionado, congregacao: congregacaoSelecionada, horario, data: dataFormatada, ativo:true});
        salvarEventos(eventos);
        await client.sendMessage(chatId,"✅ Evento cadastrado com sucesso!");
    }else{await client.sendMessage(chatId,"❌ Cadastro cancelado");}
}

function esperarResposta(chatId, client){
    return new Promise(resolve=>{
        client.once("message", msg=>{
            if(msg.from===chatId) resolve(msg.body.trim());
        });
    });
}

function lerEventos(){ return fs.existsSync(eventosPath)?JSON.parse(fs.readFileSync(eventosPath)):[]; }
function salvarEventos(eventos){ fs.writeFileSync(eventosPath, JSON.stringify(eventos,null,2)); }
function formatarData(str){ const [d,m,a] = str.split("/").map(Number); const dt = new Date(a,m-1,d); return isNaN(dt)?null:dt.toISOString().split("T")[0]; }

module.exports = { cadastrarEvento };
