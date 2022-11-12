const { ApplicationCommandType, EmbedBuilder } = require('discord.js');

module.exports = {
  name: "uptime",
  category: "utils",
  description: "Quanto tempo estou operando?",
  type: ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
        // DIAS
        let dias1 = Math.floor(client.uptime / 86400000);
        // HORAS
        let horas2 = Math.floor(client.uptime / 3600000) % 24;
        // MINUTOS
        let minutos3 = Math.floor(client.uptime / 60000) % 60;
        // SEGUNDOS
        let segundos4 = Math.floor(client.uptime / 1000) % 60;
        // EMBED
        let embed = new EmbedBuilder()
            .setColor('FF0000')
            .setTitle(`Horário de Inicialização`)
            .setDescription(`Olá ${interaction.user}, eu fui iniciado há: \n\`${dias1}d ${horas2}h ${minutos3}m ${segundos4}s\``)
            .setFooter({
                text: `Comando requisitado por: ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL({ format: "png" })
            });

        interaction.reply({ content: `${interaction.user}`, embeds: [embed], ephemeral: true })
    }
}