import { Client, Intents } from "discord.js";
import { ActivityTypes } from "discord.js/typings/enums";
import { getClientToken } from "./system/config";
import { Threader } from "./system/threader";
import { createTicket } from "./threadTypes/ticket";

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const supportTicketChannels = {
    from: "860655061460582460",
    to: "926957014100344922",
};

client.on("ready", () => {
    client.user.setActivity("Ideas Submissions", { type: ActivityTypes.LISTENING });
    client.on("messageCreate", Threader.handle);
    Threader.init(client);
    Threader.bind(supportTicketChannels.from, supportTicketChannels.to, createTicket);
    console.log(`[${Date.now()}] Started NbdyAsst Successfully. Listening for Messages.`);
});

client.login(getClientToken());
