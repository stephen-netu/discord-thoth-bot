import { Client, Message, MessageEmbed, TextChannel } from "discord.js";

export async function createFeatureRequest(client: Client, message: Message, to: string) {
    const title = message.content.toString().slice(0, 28) + "...";
    const content = message.content;
    const authorText = `${message.author.username}#${message.author.discriminator}`;
    const author = `<@!${message.author.id}>`;
    await message.delete();

    const channel = client.channels.cache.get(to) as TextChannel;
    const embed = new MessageEmbed({
        title: `Feature Request by ${authorText}`,
        description: `${content}`,
        color: "LUMINOUS_VIVID_PINK",
        footer: {
            text: `Created by ${message.author.tag}. Please provide any additional details in-thread.`,
            iconURL: message.author.avatarURL(),
        },
    });

    const newMessage = await channel.send({ embeds: [embed], content: `${author}` });
    newMessage.startThread({ name: title, rateLimitPerUser: 50, reason: `Feature Request Ticket` });
}
