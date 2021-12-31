import { Client, Message, MessageEmbed, TextChannel } from "discord.js";

export async function createTicket(client: Client, message: Message, to: string) {
    const content = message.content;
    const authorText = `${message.author.username}#${message.author.discriminator}`;
    const threadName = `${authorText} Ticket`;
    const author = `<@!${message.author.id}>`;
    await message.delete();

    const channel = client.channels.cache.get(to) as TextChannel;
    const embed = new MessageEmbed({
        title: `Support Ticket for ${authorText}`,
        description: `${content}`,
        color: "AQUA",
        footer: {
            text: `Requested by ${message.author.tag}. If someone is able to answer your question they will write in this thread. Please be patient.`,
            iconURL: message.author.avatarURL(),
        },
    });

    const newMessage = await channel.send({ embeds: [embed], content: `${author}` });
    newMessage.startThread({ name: threadName, rateLimitPerUser: 50, reason: `Support Ticket Request` });
}
