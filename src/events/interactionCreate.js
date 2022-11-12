module.exports = async (client, interaction) => {

    const dbGuild = await client.db.guilds.findOne({ _id: interaction.guild.id, });
    const dbUser = await client.db.users.findOne({ _id: interaction.user.id, });

    if (!dbGuild) await client.db.guilds.create({ _id: interaction.guild.id });
    if (!dbUser) await client.db.users.create({ _id: interaction.user.id });

    if (interaction.isCommand()) {
        const slashCmd = client.slash.get(interaction.commandName);
        if (!slashCmd) return interaction.reply({ content: 'Ocorreu um erro.' });

        const argsCmd = [];

        for (let optionCmd of interaction.options.data) {
            if (optionCmd.type === 'SUB_COMMAND') {
                if (optionCmd.name) args.push(optionCmd.name);
                optionCmd.options?.forEach(x => {
                    if (x.value) args.push(x.value);
                });
            } else if (optionCmd.value) args.push(optionCmd.value);
        }

        try {
            slashCmd.run(client, interaction, argsCmd);
        } catch (err) {
            let logs = new Discord.MessageEmbed()
                .setTitle(`🚨 | Ocorreu um erro! __**interactionCreate.js**__`)
                .setColor('Red')
                .setDescription(`Descrição do erro:\n\n` + err)
            client.channels.cache.get('1040430788400914482').send({ embeds: [logs] });
            console.error("🚨 | [Erro] " + err);
        }

    }
}
