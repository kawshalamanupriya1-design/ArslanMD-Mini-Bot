const { cmd } = require("../arslan");
const moment = require("moment");
const { fakevCard } = require('../lib/fakevCard');

let botStartTime = Date.now(); 
const ALIVE_IMG = "https://github.com/kawwagaming02/kawshala-md/blob/main/images/KAWSHALA-MD%20(1).jpg?raw=true"; 

cmd({
    pattern: "alive",
    desc: "Check if the bot is active.",
    category: "owner",
    react: "💡",
    filename: __filename
}, async (conn, mek, m, { reply, from }) => {
    try {
        const pushname = m.pushName || "User"; 
        const currentTime = moment().format("HH:mm:ss");
        const currentDate = moment().format("dddd, MMMM Do YYYY");

        const runtimeMilliseconds = Date.now() - botStartTime;
        const runtimeSeconds = Math.floor((runtimeMilliseconds / 1000) % 60);
        const runtimeMinutes = Math.floor((runtimeMilliseconds / (1000 * 60)) % 60);
        const runtimeHours = Math.floor(runtimeMilliseconds / (1000 * 60 * 60));

        const formattedInfo = `
╭┄┄┄┄[ *katana-ᴍᴅ sᴛᴀᴛᴜs* ]┄┄
┊
┊     Hi 🫵🏽 ${pushname}
┊
┊🕒 *ᴛɪᴍᴇ*: ${currentTime}
┊📅 *ᴅᴀᴛᴇ*: ${currentDate}
┊⏳ *ᴜᴘᴛɪᴍᴇ*: ${runtimeHours} hours, ${runtimeMinutes} minutes, ${runtimeSeconds} seconds
╰───────────────

> 🤖 *Status*: *katan-MD-Mini is Alive and Ready!*

🎉 *Enjoy the Service!*
        `.trim();

        if (!ALIVE_IMG || !ALIVE_IMG.startsWith("http")) {
            throw new Error("Invalid ALIVE_IMG URL. Please set a valid image URL.");
        }

        // contextInfo ayin karala damma
        await conn.sendMessage(from, {
            image: { url: ALIVE_IMG },
            caption: formattedInfo,
        }, { quoted: fakevCard });

    } catch (error) {
        console.error("Error in alive command: ", error);
        const errorMessage = `
❌ An error occurred while processing the alive command.
🛠 *Error Details*:
${error.message}

Please report this issue or try again later.
        `.trim();
        return reply(errorMessage);
    }
});
