import { Client, Message, MessageEmbed, TextChannel } from "discord.js";

export async function createTicket(client: Client, message: Message, to: string) {
    const title = message.content.toString().slice(0, 8);
    const content = message.content;
    const authorText = `${message.author.username}#${message.author.discriminator}`;
    const author = `<@!${message.author.id}>`;
    const role = `<@926948590402822146>`
    await message.delete();

    const channel = client.channels.cache.get(to) as TextChannel;
    const embed = new MessageEmbed({
        title: `New Idea by ${authorText}`,
        description: `${content}`,
        color: "LUMINOUS_VIVID_PINK",
        footer: {
            text: `Created by ${message.author.tag}. Please provide any additional details in the new thread.`,
            iconURL: message.author.avatarURL(),
        },
    });

    const newMessage = await channel.send({ embeds: [embed], content: `<@&837062271745654784>` });
    newMessage.startThread({ name: title, rateLimitPerUser: 0, reason: `New Idea Submission` });
}
