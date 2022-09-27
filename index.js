require("dotenv").config();
const { Client, GatewayIntentBits, ApplicationCommandOptionType } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.on("ready", () => {
    console.log("ready");
    client.application.commands.set([
        {
            name: "card",
            description: "カード枚数を計算します",
            options: [
                {
                    type: ApplicationCommandOptionType.Integer,
                    name: "wave",
                    description: "ウェーブ数",
                    required: true,
                    minValue: 1
                }
            ]
        }
    ]);
});

client.on("interactionCreate", (i) => {
    if (!i.isChatInputCommand()) return;
    const v = i.options.getInteger("wave");
    if (v > 45) {
        i.reply(`${eval(`4*${v}-109-(-1)**${v}`)}`);
    } else {
        const p = Math.floor(v / 5);
        i.reply(`${(p + (v % 5)) + (v % 5 >= 3 ? 1:0) + (v % 5 === 0 ? 2:0)}`);
    }
});

client.login(process.env.TOKEN);