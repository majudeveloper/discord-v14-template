const osu = require('node-os-utils')
const cpu = osu.cpu
const mem = osu.mem
const os = osu.os
const { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

module.exports = {
    name: "botinfo",
    category: "utils",
    description: "Saiba minhas informações.",
    type: ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    let cpuUsage = (await cpu.usage()) + "%";
    let memoryUsage = (await mem.info()).usedMemMb + "MB";
    let memoryfree = (await mem.info()).freeMemMb + "MB";
    let memoryUsageTotal = (await mem.info()).totalMemMb + "MB";
    let operatingSystemName = `${os.hostname()}`
    let majusv = client.guilds.cache.size;
    let users = client.users.cache.size;
    let channels = client.channels.cache.size;
    let ping = client.ws.ping;
    let dona = client.users.cache.get("973587964452044820")
    let prefixo = 'k!';
    let dias = Math.floor(client.uptime / 86400000);
    let horas = Math.floor(client.uptime / 3600000) % 24;
    let minutos = Math.floor(client.uptime / 60000) % 60;
    let segundos = Math.floor(client.uptime / 1000) % 60;



    const embed = new EmbedBuilder()
      .setTitle(`Olá ${interaction.user.tag}, minhas informações estão abaixo!`)
      .setColor('A020F0')
      .setDescription(`\`Informações do BOT\`\n\nMeu prefixo é \`${prefixo}\`\nMeu ping é de \`${ping}\`ms\nEstou em \`${majusv}\` servidores\nAcessando \`${channels}\` canais\nModerando \`${users}\` usuários!\nEstou online há: \`${dias}\`**d** \`${horas}\`**h** \`${minutos}\`**m** \`${segundos}\`**s**. \n\nInformações sobre a máquina:\n`)
      .addFields(
        { name: "> __Cpu__**: **", value: `> ${cpuUsage}`, inline: true },
        { name: "> __Ram__**: **", value: `> Total: \`${memoryUsageTotal}\`\n> Utilizando: \`${memoryUsage}\`\n> Restante: \`${memoryfree}\``, inline: true },
        { name: "> __OS info__**: **", value: `> Sistema Operacional: \`Windows 10\`\n> Nome de Usuário: \`maju\``, inline: true }
      )
      .setFooter({
        text: `Comando requisitado por: ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL({ format: "png" })
      }
      );

    const buttons = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('1')
          .setStyle('Primary')
          .setLabel('<')
          .setDisabled(false),

        new ButtonBuilder()
          .setCustomId('2')
          .setStyle('Primary')
          .setLabel('>')
          .setDisabled(false),

        new ButtonBuilder()
          .setCustomId('3')
          .setStyle('Danger')
          .setLabel('Fechar!')
          .setDisabled(false)
      )

    const linksuporte = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setStyle('Link')
          .setURL('https://discord.gg/5XUEf4HX9R')
          .setLabel('Servidor de Suporte')
      )

      interaction.channel.send({ content: `${interaction.user}`, embeds: [embed], ephemeral: true, components: [buttons, linksuporte] }).then(msg => {

      const filter = i => i.isButton();
      const collector = msg.createMessageComponentCollector({ filter: filter, time: 6e4 });

      collector.on("collect", async (interaction) => {
        if (interaction.user.id !== interaction.user.id) return;

        switch (interaction.customId) {
          case '1': {
            embed.setTitle(` Olá ${interaction.user.tag}, minhas informações estão abaixo! `)
            embed.setColor('A020F0')
            embed.setDescription(`\`Informações do BOT\`\n\nMeu prefixo é \`${prefixo}\`\nPing do WebSocket: \`${ping}\`ms\nEstou em \`${majusv}\` servidores\nAcessando \`${channels}\` canais\nModerando \`${users}\` usuários!\nEstou online há: \`${dias}\`**d** \`${horas}\`**h** \`${minutos}\`**m** \`${segundos}\`**s**.\n\nInformações sobre a máquina:\n`)
            embed.setFooter({
              text: `Comando requisitado por: ${interaction.user.tag}`,
              iconURL: interaction.user.displayAvatarURL({ format: "png" })
            }
            );
            msg.edit({ embeds: [embed], components: [buttons], ephemeral: true, content: `${interaction.user}` });
            await interaction.deferUpdate();
            break;
          }
          case '2': {
            const twoembed = new EmbedBuilder()
            twoembed.setTitle(` Olá ${interaction.user.tag}, informações do desenvolvedor está abaixo! `)
            twoembed.setDescription(`\`Informações da Desenvolvedora:\`\n\n\nNickname: \`${dona.tag}\`\nID: \`${dona.id}\`\nMenção: ${dona} `)
            twoembed.setColor('A020F0')
            twoembed.setFooter({
              text: `Comando requisitado por: ${interaction.user.tag}`,
              iconURL: interaction.user.displayAvatarURL({ format: "png" })
            }
            );
            msg.edit({ embeds: [twoembed], components: [buttons], ephemeral: true, content: `${interaction.user}` })
            await interaction.deferUpdate();
            break;
          }

          case '3': {
            msg.delete()
            break;

          }
        }
      })
    })
  }
}