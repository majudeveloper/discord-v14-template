const { EmbedBuilder } = require("discord.js");
module.exports = {
    name: "uptime",

    run: async (client, message, args) => {
        message.delete
        // DIAS
        let dias = Math.floor(client.uptime / 86400000);
        // HORAS
        let horas = Math.floor(client.uptime / 3600000) % 24;
        // MINUTOS
        let minutos = Math.floor(client.uptime / 60000) % 60;
        // SEGUNDOS
        let segundos = Math.floor(client.uptime / 1000) % 60;
        // EMBED
        let embed = new EmbedBuilder()
            .setColor('Purple')
            .setTitle(`Horário de Inicialização`)
            .setDescription(`Olá ${message.author}, eu fui iniciado há: \n\`${dias}d ${horas}h ${minutos}m ${segundos}s\``)
            .setFooter({
                text: `Comando requisitado por: ${message.author.tag}`,
                iconURL: message.author.displayAvatarURL({ format: "png" })
            });

        message.reply({ content: `${message.author}`, embeds: [embed] })
    }
}