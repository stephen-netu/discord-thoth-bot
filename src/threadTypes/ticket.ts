import { Client, Message, MessageEmbed, TextChannel } from "discord.js";

export async function createTicket(client: Client, message: Message, to: string) {
    const content = message.content;
    const authorText = `${message.author.username}#${message.author.discriminator}`;
    const threadName = `${authorText}`;
    const author = `<@!${message.author.id}>`;
    await message.delete();

    const channel = client.channels.cache.get(to) as TextChannel;
    const embed = new MessageEmbed({
        title: `New Idea - ${authorText}`,
        description: `${content}`,
        color: "AQUA",
        footer: {
            text: `Posted by ${message.author.tag}.`,
            iconURL: message.author.avatarURL(),
        },
    });

    const newMessage = await channel.send({ embeds: [embed], content: `${author}` });
    newMessage.startThread({ name: threadName, rateLimitPerUser: 50, reason: `New Idea` });
}
