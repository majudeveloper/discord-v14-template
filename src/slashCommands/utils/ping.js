const { ApplicationCommandType, EmbedBuilder } = require('discord.js');

module.exports = {
  name: "ping",
  category: "utils",
  description: "Mostrar minha latência.",
  type: ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    const ping = client.ws.ping
    const embed = new EmbedBuilder()

      .setTitle(`Latência:`)
      .setDescription(`:ping_pong: A latência do WebSocket é de: \`${ping}ms\`!`)
      .setColor('Purple')
      .setFooter({
        text: `Comando requisitado por: ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL({ format: "png" })
      });
    interaction.reply({ content: `${interaction.user}`, embeds: [embed], ephemeral: true });
  }
}
