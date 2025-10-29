const fs = require("fs");
const path = require("path");
const eventosPath = path.join(__dirname, "../data/eventos.json");
 
function listarEventos(msg, client){
    const eventos = lerEventos();
    const hoje = new Date();
    const ativos = eventos.filter(e=>new Date(e.data)>=hoje);

    if(ativos.length===0){client.sendMessage(msg.from,"📭 Nenhum evento ativo encontrado."); return;}

    const texto = ativos.map((e,i)=>`#${i+1}\n📘 ${e.tipo}\n🏠 ${e.congregacao}\n🕐 ${e.horario}\n📅 ${formatarData(e.data)}`).join("\n\n");
    client.sendMessage(msg.from,`📋 *Eventos Ativos:*\n\n${texto}`);
}

function lerEventos(){ return fs.existsSync(eventosPath)?JSON.parse(fs.readFileSync(eventosPath)):[]; }
function formatarData(dataISO){ const [ano,mes,dia]=dataISO.split("-"); return `${dia}/${mes}/${ano}`; }

module.exports = { listarEventos };
