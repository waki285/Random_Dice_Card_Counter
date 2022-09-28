require("dotenv").config();
const { Client, GatewayIntentBits, ApplicationCommandOptionType } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.on("ready", () => {
    console.log("ready");
    client.application.commands.set([
        {
            name: "card",
            description: "カード枚数を計算します",
            descriptionLocalizations: {
                "en-US": "Co-op wave => card"
            },
            options: [
                {
                    type: ApplicationCommandOptionType.Integer,
                    name: "wave",
                    description: "ウェーブ数",
                    descriptionLocalizations: {
                        "en-US": "Wave count"
                    },
                    required: true,
                    minValue: 1
                }
            ]
        },
        {
            name: "minimum_wave",
            description: "指定したカード枚数を稼ぐために必要なウェーブ数を計算します",
            descriptionLocalizations: {
                "en-US": "Calculates the number of waves required to earn a given number of cards"
            },
            options: [
                {
                    type: ApplicationCommandOptionType.Integer,
                    name: "card",
                    description: "カード枚数",
                    descriptionLocalizations: {
                        "en-US": "Card count"
                    },
                    required: true,
                    minValue: 1
                }
            ]
        }
    ]);
});

const calc = (v) => {
    if (v > 45) {
        return eval(`4*${v}-109-(-1)**${v}`);
    } else {
        const p = Math.floor(v / 5) * 8;
        if (v % 5 === 0) return p;
        else return (p + (v % 5)) + ((v % 5 || 5) >= 3 ? 1:0) + ((v % 5 || 5) === 0 ? 2:0);
    }
}

const arr = [1, 2, 4, 5, 8];

client.on("interactionCreate", (i) => {
    if (!i.isChatInputCommand()) return;
    if (i.commandName === "card") {
        const v = i.options.getInteger("wave");
        return i.reply(`${calc(v)}`);
    }
    if (i.commandName === "minimum_wave") {
        const c = i.options.getInteger("card");
        if (c <= 72) {
            const d = Math.floor(c / 8);
            if (c % 8 === 0) {
                return i.reply(`カードを ${c} 枚稼ぐには \`${(c / 8) * 5}\`ウェーブが必要です\n(このウェーブまで到達することで ${c} 枚のカードを入手できます)`)
            } else {
                const amari = c - (d * 8);
                let amarisuu = 0;
                switch (amari) {
                    case 1:
                        amarisuu = 1;
                    case 2:
                        amarisuu = 2;
                    case 3:
                    case 4:
                        amarisuu = 3;
                    case 5:
                        amarisuu = 4;
                    case 6:
                    case 7:
                    case 8:
                        amarisuu = 5;
                };
                const ww = d * 5 + amarisuu;
                return i.reply(`カードを ${c} 枚稼ぐには \`${ww}\` ウェーブが必要です\n(このウェーブまで到達することで ${calc(ww)} 枚のカードを入手できます)`)
            }
        }
    }
});

client.login(process.env.TOKEN);