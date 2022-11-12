const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ping",

  run: async (client, message, argsBot) => {
    const ping = client.ws.ping
    const embed = new EmbedBuilder()
      .setTitle(`Latência:`)
      .setDescription(`:ping_pong: A latência do WebSocket é de: \`${ping}ms\`!`)
      .setColor('Purple')
      .setFooter({
        text: `Comando requisitado por: ${message.author.tag}`,
        iconURL: message.author.displayAvatarURL({ format: "png" })
      });
    message.reply({ content: `${message.author}`, embeds: [embed] });

  }
}