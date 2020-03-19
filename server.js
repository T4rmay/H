const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://ultrabotx.glitch.me/`);
}, 280000);

// كل البكجات الي ممكن تحتجها في اي بوت
const { Client, RichEmbed } = require("discord.js");
var { Util } = require("discord.js");
const db = require("quick.db");
const { TOKEN, YT_API_KEY, prefix, devs } = require("./config.js");
const client = new Client({ disableEveryone: true });
const ytdl = require("ytdl-core");
const Enmap = require("enmap");
const canvas = require("canvas");
const convert = require("hh-mm-ss");
const fetchVideoInfo = require("youtube-info");
const dbg = new Enmap({ name: "Giveaway" });
const botversion = require("./package.json").version;
const simpleytapi = require("simple-youtube-api");
const moment = require("moment");
const fs = require("fs");
const util = require("util");
const gif = require("gif-search");
const opus = require("node-opus");
const ms = require("ms");
const r1 = require("snekfetch");
const jimp = require("jimp");
const { get } = require("snekfetch");
const guild = require("guild");
const dateFormat = require("dateformat"); //npm i dateformat
const YouTube = require("simple-youtube-api");
const youtube = new YouTube("AIzaSyC-cxrwR4E2lizvODfupRtCIFht7taB_FM");
const hastebins = require("hastebin-gen");
const getYoutubeID = require("get-youtube-id");
const yt_api_key = "AIzaSyDeoIH0u1e72AtfpwSKKOSy3IPp2UHzqi4";
const pretty = require("pretty-ms");
client.login(TOKEN);
const queue = new Map();
var table = require("table").table;
const Discord = require("discord.js");
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

  console.log(`Servers! [ " ${client.guilds.size} " ]`);
  console.log(`Users! [ " ${client.users.size} " ]`);
  console.log(`Channels! [ " ${client.channels.size} " ]`);

  console.log(`Prefix! [ " ${prefix}" ]`);
  console.log(`Language! [ " NodeJS " ]`);
  console.log(
    `Ram Usage! [ " ${(process.memoryUsage().rss / 1048576).toFixed()}MB " ]`
  );

  client.user.setActivity(` ${prefix}help `, { type: "Playing" });
});

client["on"]("message", message => {
  if (message["author"]["bot"]) return undefined;
  let args = message["content"]["split"](" ");
  if (message["content"]["startsWith"](prefix + "kick")) {
    if (!message["member"]["hasPermission"]("MANAGE_GUILD"))
      return message["channel"].send(`**:x:\`| You Not Have Permission\`**`);
    let user = message.guild.member(
      message.mentions.users.first() || message.guild.members.get(args[1])
    );
    if (!user)
      return message["channel"]["send"](
        `**Usage | ${prefix}kick \`[User/UserID]\`**`
      );
    let Reason = message["content"]
      ["split"](" ")
      .slice(2)
      .join(" ");
    if (!Reason)
      return message["channel"]["send"](`:x:| **Please Type Reason**`);
    message.guild.member(user).kick(Reason);
    message["channel"]["send"](
      `**:white_check_mark: | Done Has Kicked <a:overify:688707812225712152><@${user.id}> Reason: \`${Reason}\`**`
    );
  }
});

client["on"]("message", message => {
  var prefix = "#";
  if (message["author"]["bot"]) return undefined;
  let args = message["content"]["split"](" ");
  if (message["content"]["startsWith"](prefix + "ban")) {
    if (!message["member"]["hasPermission"]("MANAGE_GUILD"))
      return message["channel"].send(`**:x:\`| You Not Have Permission\`**`);
    let user = message.guild.member(
      message.mentions.users.first() || message.guild.members.get(args[1])
    );
    if (!user)
      return message["channel"]["send"](
        `**Usage | ${prefix}ban \`[User/UserID]\`**`
      );
    let Reason = message["content"]
      ["split"](" ")
      .slice(2)
      .join(" ");
    if (!Reason)
      return message["channel"]["send"](`:x:| **Please Type Reason**`);
    message.guild.member(user).ban(Reason);
    message["channel"]["send"](
      `**:white_check_mark: | Done Has Banned <@${user.id}> Reason: \`${Reason}\`**`
    );
  }
});

client.on("message", async message => {
  let args = message.content.split(" ");
  if (message.content.startsWith(prefix + "mute")) {
    if (!message.member.hasPermission("MUTE_MEMBERS"))
      return message.channel.send("").then(msg => {
        msg.delete(3500);
        message.delete(3500);
      });

    if (!message.guild.member(client.user).hasPermission("MUTE_MEMBERS"))
      return message.channel.send("").then(msg => {
        msg.delete(3500);
        message.delete(3500);
      });

    let mention = message.mentions.members.first();
    if (!mention)
      return message.channel.send("").then(msg => {
        msg.delete(3500);
        message.delete(3500);
      });

    if (mention.id === message.author.id)
      return message.channel
        .send("**:x:You Cannot give mute to your self**")
        .then(msg => {
          msg.delete(3500);
          message.delete(3500);
        });

    if (mention.hasPermission("ADMINISTRATOR"))
      return message.channel.send(`**:x: لا يمكن آعطاء ميوت لادارة السيرفر**`);

    if (message.guild.member(mention).roles.find("name", "Muted"))
      return message.channel.send(
        `**:information_source: ${mention.user.username} **`
      );

    if (mention.position >= message.guild.member(message.author).positon)
      return message.channel
        .send("You Donot Have Permission **Muted_Members** ")
        .then(msg => {
          msg.delete(3500);
          message.delete(3500);
        });

    if (mention.positon >= message.guild.member(client.user).positon)
      return message.channel
        .send("I Donot Have Permission **Muted_Members**")
        .then(msg => {
          msg.delete(3500);
          message.delete(3500); //vortex حقوق الفا كودز و
        });

    let duration = args[2];
    if (!duration)
      message.channel
        .send(`**:hash: You Can Use ${prefix}mute @user Time Reason**`)
        .then(msg => {
          msg.delete(3500);
          message.delete(3500);
        });

    if (isNaN(duration))
      message.channel.send("").then(msg => {
        msg.delete(3500);
        message.delete(3500);
      });

    let reason = message.content
      .split(" ")
      .slice(3)
      .join(" ");
    if (!reason) reason = " [ **لم يذكر لماذا** ] ";

    let thisEmbed = new Discord.RichEmbed()
      .setAuthor(mention.user.username, mention.user.avatarURL)
      .setTitle("**تم آعطائك ميوت<a:overify:688707812225712152>**")
      .addField("**__السيرفر__**", [message.guild.name])
      .addField("**__تم آعطائك ميوت بواسطة__**", [message.author])
      .addField("**__آلسبب__**", reason)
      .addField("**__وقت الميوت__**", duration);

    let role =
      message.guild.roles.find("name", "Muted") ||
      message.guild.roles.get(r => r.name === "Muted");
    if (!role)
      try {
        message.guild
          .createRole({
            name: "Muted",
            permissions: 0
          })
          .then(r => {
            message.guild.channels.forEach(c => {
              c.overwritePermissions(r, {
                SEND_MESSAGES: false,
                READ_MESSAGES_HISTORY: false,
                ADD_REACTIONS: false
              });
            });
          });
      } catch (e) {
        console.log(e.stack);
      }
    mention.addRole(role).then(() => {
      mention.send(thisEmbed);
      message.channel.send(
        `**<a:overify:688707812225712152> ${mention.user.username}  Muted! :zipper_mouth:  **  `
      );
      mention.setMute(true);
    });
    setTimeout(() => {
      if (duration === 0) return;
      mention.setMute(false);
      mention.removeRole(role);
    }, duration * 60000);
  }
});
client.on("message", async message => {
  let mention = message.mentions.members.first();
  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);
  let args = message.content.split(" ").slice(1);
  if (command === `unmute`) {
    2;
    if (!message.member.hasPermission("MUTE_MEMBERS"))
      return message.channel
        .sendMessage("**You Donot HavePermission Mute_Members**")
        .then(m => m.delete(5000));
    if (!message.guild.member(client.user).hasPermission("MUTE_MEMBERS"))
      return message
        .reply("**I donot Have Permission Mute_Members**")
        .then(msg => msg.delete(6000));

    let kinggamer =
      message.guild.member(message.mentions.users.first()) ||
      message.guild.members.get(args[0]);
    if (!kinggamer)
      return message.channel.send("").then(msg => {
        msg.delete(3500);
        message.delete(3500);
      });

    let role = message.guild.roles.find(r => role.name === "Muted");

    if (!role || !kinggamer.roles.has(role.id))
      return message.channel.sendMessage(
        `**:information_source:${mention.user.username} **`
      );

    await kinggamer.removeRole(role);
    message.channel.sendMessage(
      `**:white_check_mark: ${mention.user.username}  Unmuted!<a:overify:688707812225712152> **`
    );

    return;
  }
});

client.on("message", message => {
  if (!message.channel.guild) return;
  if (message.content == "#count")
    message.reply(`**${message.guild.memberCount}**`);
});

client.on("message", async message => {
  if (message.content.startsWith(prefix + "help")) {
    /// امر القائمه
    let help = new Discord.RichEmbed()
      .setColor("3d3b3b")
      .setThumbnail(message.author.avatarURL).setDescription(`**
   >                Help Menu Commands 
>   『:earth_africa:${prefix}Public  اوامر العامة
>   『:running_shirt_with_sash:${prefix}Admin    اوامر الادمن
>   『:lock:${prefix}Protections  اوامر الحماية
>   『:video_game:${prefix}Games  اوامر الالعاب
>   『:wave:${prefix}Welcomer  اوامر الترحيب
>   『:notes:${prefix}Music  اوامر الموسيقى
>   『:tickets:${prefix}Ticket  اوامر التكت
**`);
    message.channel.sendEmbed(help);
  }
});

client.on("message", async message => {
  if (message.content.startsWith(prefix + "Public")) {
    /// امر القائمه
    let help = new Discord.RichEmbed()
      .setColor("3d3b3b")
      .setThumbnail(message.author.avatarURL).setDescription(`**
        『 Public CMDS
『:earth_africa:${prefix}Profile
『:earth_africa:${prefix}count
『:earth_africa:${prefix}credits
『:earth_africa:${prefix}daily
『:earth_africa:${prefix}server
『:earth_africa:${prefix}link
『:earth_africa:${prefix}invite-codes
『:earth_africa:${prefix}Minv
『:earth_africa:${prefix}moreinfo
『:earth_africa:${prefix}botinv
『:earth_africa:${prefix}members
『:earth_africa:${prefix}id
『:earth_africa:${prefix}top
『:earth_africa:${prefix}Emojis1
『:earth_africa:${prefix}Emojis2
**`);
    message.channel.sendEmbed(help);
  }
});

client.on("message", async message => {
  if (message.content.startsWith(prefix + "Ticket")) {
    /// امر القائمه
    let help = new Discord.RichEmbed()
      .setColor("3d3b3b")
      .setThumbnail(message.author.avatarURL).setDescription(`**
        『 Public CMDS
『:tickets:new
『:tickets:close
『:tickets:confirm
**`);
    message.channel.sendEmbed(help);
  }
});

client.on("message", async message => {
  if (message.content.startsWith(prefix + "Music")) {
    let help = new Discord.RichEmbed()
      .setColor("3d3b3b")
      .setThumbnail(message.author.avatarURL).setDescription(`**
        『 Music CMDS
『:notes:${prefix}play
『:notes:${prefix}skip
『:notes:${prefix}stop
『:notes:${prefix}np
『:notes:${prefix}queue
『:notes:${prefix}vol
『:notes:${prefix}resume
**`);
    message.channel.sendEmbed(help);
  }
});

client.on("message", async message => {
  if (message.content.startsWith(prefix + "Welcomer")) {
    /// امر القائمه
    let help = new Discord.RichEmbed()
      .setColor("#3d3b3b")
      .setThumbnail(message.author.avatarURL).setDescription(`**
        『 Welcomer CMDS
『:wave:${prefix}setLeave
『:wave:${prefix}toggleLeave
『:wave:${prefix}toggleWelcome
『:wave:${prefix}toggleDmwelcome
『:wave:${prefix}setWelcomer <RomeName>
『:wave:${prefix}toggleInvitedby
**`);
    message.channel.sendEmbed(help);
  }
});

client.on("message", async message => {
  if (message.content.startsWith(prefix + "Games")) {
    /// امر القائمه
    let help = new Discord.RichEmbed()
      .setColor("#3d3b3b")
      .setThumbnail(message.author.avatarURL).setDescription(`**
       『Games CMDS
『:video_game:${prefix}Select
『:video_game:${prefix}Tweets
『:video_game:${prefix}Frankly
**`);
    message.channel.sendEmbed(help);
  }
});

client.on("message", async message => {
  if (message.content.startsWith(prefix + "Protections")) {
    /// امر القائمه
    let help = new Discord.RichEmbed()
      .setColor("#3d3b3b")
      .setThumbnail(message.author.avatarURL).setDescription(`**
                     『Protections CMDS
『:lock:settings limits
『:lock:${prefix}settings limitskick <number>
『:lock:${prefix}settings limitsroleD <number>
『:lock:${prefix}settings limitsroleC <number>
『:lock:${prefix}settings limitsban <number>
『:lock:${prefix}settings limitschannelD <number>
『:lock:${prefix}settings limitstime <number>
『:lock:${prefix}AntiBots On
『:lock:${prefix}AntiBots Off
**`);
    message.channel.sendEmbed(help);
  }
});

client.on("message", async message => {
  if (message.content.startsWith(prefix + "Admin")) {
    let help = new Discord.RichEmbed()
      .setColor("#3d3b3b")
      .setThumbnail(message.author.avatarURL).setDescription(`**
        『 Admin CMDS
『:running_shirt_with_sash:${prefix}ban ID/Mention <resone>
『:running_shirt_with_sash:${prefix}unban ID
『:running_shirt_with_sash:${prefix}kick ID/Mention <resone>
『:running_shirt_with_sash:${prefix}hide 
『:running_shirt_with_sash:${prefix}show
『:running_shirt_with_sash:${prefix}gcreate <time>
『:running_shirt_with_sash:${prefix}say <Type Any Thing>
『:running_shirt_with_sash:${prefix}bc <message>
『:running_shirt_with_sash:${prefix}mute Mention <resone>
『:running_shirt_with_sash:${prefix}unmute Mention
『:running_shirt_with_sash:${prefix}warn Mention <resone>
『:running_shirt_with_sash:${prefix}umc
『:running_shirt_with_sash:${prefix}mc
『:running_shirt_with_sash:${prefix}setNickname on <Name>
**`);
    message.channel.sendEmbed(help);
  }
});

client.on("guildMemberAdd", member => {
  let channel = member.guild.channels.get(""); //حط ايدي روم الترحيب هنا
  var h = member.user;
  let embed = new Discord.RichEmbed()

    .setColor("RANDOM")
    .setThumbnail(h.avatarURL)
    .setImage(
      "https://cdn.discordapp.com/attachments/686886897804509194/686900091629600834/giphy_2.gif"
    )
    .setTitle(
      `Weclome The The Server ${member.user.username} ولكم الى السيرفرس منور  `
    )
    .addField(
      "Created At",
      `${moment(member.user.createdAt).format("D/M/YYYY ")} `
    )
    .addField("JoinedAt", `${moment(member.joinedAt).format("D/M/YYYY  ")} `);
  channel.send({ embed: embed });
});

client.on("message", message => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + "clear")) {
    if (!message.channel.guild)
      return message.reply("⛔ | This Command For Servers Only!");
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        "⛔ | You dont have **MANAGE_MESSAGES** Permission!"
      );
    if (!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        "⛔ | I dont have **MANAGE_MESSAGES** Permission!"
      );
    let args = message.content.split(" ").slice(1);
    let messagecount = parseInt(args);
    if (args > 99)
      return message
        .reply("**🛑 || يجب ان يكون عدد المسح أقل من 100 .**")
        .then(messages => messages.delete(5000));
    if (!messagecount) args = "100";
    message.channel
      .fetchMessages({ limit: messagecount + 1 })
      .then(messages => message.channel.bulkDelete(messages));
    message.channel
      .send(
        `\`${args}\`** : <a:overify:688707812225712152>__عدد الرسائل التي تم مسحها __ **`
      )
      .then(messages => messages.delete(5000));
  }
});

client.on("message", message => {
  if (message.content === prefix + "mc") {
    if (!message.channel.guild)
      return message.reply("** This command only for servers**");

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.reply(" **__ليس لديك صلاحيات__**");
    message.channel
      .overwritePermissions(message.guild.id, {
        SEND_MESSAGES: false
      })
      .then(() => {
        message.reply("**__تم تقفيل الشات__ :white_check_mark: **");
      });
  }
  if (message.content === prefix + "umc") {
    if (!message.channel.guild)
      return message.reply("** This command only for servers**");

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.reply("**__ليس لديك صلاحيات__**");
    message.channel
      .overwritePermissions(message.guild.id, {
        SEND_MESSAGES: true
      })
      .then(() => {
        message.reply("**__تم فتح الشات__:white_check_mark:**");
      });
  }
});

client.on("message", function(message) {
  if (message.channel.type === "dm") {
    if (message.author.id === client.user.id) return;
    var ziad = new Discord.RichEmbed()
      .setColor("BLACK")
      .setAuthor(`رسالة جديدة في خاص البوت`)
      .setThumbnail(`${message.author.avatarURL}`)
      .setDescription(`\n\n**${message.content}**`)
      .setFooter(
        `Requested By ${message.author.tag}`,
        message.author.displayAvatarURL
      )
      .setTimestamp();
    client.users.get("684762350938488833").send({ embed: ziad });
  }
});

client.on("message", message => {
  if (!message.guild || message.author.bot) return;
  if (message.content == "#colors" || message.content == "الوان") {
    var fsn = require("fs-nextra");
    fs.readdir("./colors", async (err, files) => {
      var f = files[Math.floor(Math.random() * files.length)];
      var { Canvas } = require("canvas-constructor");
      var x = 0;
      var y = 0;
      if (message.guild.roles.filter(role => !isNaN(role.name)).size <= 0)
        return;
      message.guild.roles
        .filter(role => !isNaN(role.name))
        .sort((b1, b2) => b1.name - b2.name)
        .forEach(() => {
          x += 100;
          if (x > 100 * 12) {
            x = 100;
            y += 80;
          }
        });
      var image = await fsn.readFile(`./colors/${f}`);
      var xd = new Canvas(100 * 11, y + 350)
        .addBeveledImage(image, 0, 0, 100 * 11, y + 260, 25)
        .setTextBaseline("middle")
        .setColor("black")
        .setTextSize(80)
        .addText(`Color List`, 375, 75);
      x = 0;
      y = 150;
      message.guild.roles
        .filter(role => !isNaN(role.name))
        .sort((b1, b2) => b1.name - b2.name)
        .forEach(role => {
          x += 75;
          if (x > 100 * 10) {
            x = 75;
            y += 80;
          }
          xd.setTextBaseline("middle")
            .setTextAlign("center")
            .setColor(role.hexColor)
            .addBeveledRect(x, y, 60, 60, 15)
            .setColor("white");
          if (`${role.name}`.length > 2) {
            xd.setTextSize(30);
          } else if (`${role.name}`.length > 1) {
            xd.setTextSize(40);
          } else {
            xd.setTextSize(50);
          }
          xd.addText(role.name, x + 30, y + 30);
        });
      message.channel.sendFile(xd.toBuffer());
    });
  }
});

client.on("message", message => {
  let args = message.content.split(" ").slice(1);
  if (
    message.content.split(" ")[0] == "#color" ||
    message.content.split(" ")[0] == "لون"
  ) {
    const embedd = new Discord.RichEmbed()
      .setFooter(
        "Requested by " + message.author.username,
        message.author.avatarURL
      )
      .setDescription(`**No Color With This Name/Number ** :x: `)
      .setColor(`ff0000`);

    if (!isNaN(args) && args.length > 0)
      if (!message.guild.roles.find("name", `${args}`))
        return message.channel.sendEmbed(embedd);

    var a = message.guild.roles.find("name", `${args}`);
    if (!a) return;
    const embed = new Discord.RichEmbed()

      .setFooter(
        "Requested by " + message.author.username,
        message.author.avatarURL
      )
      .setDescription(`**Color has been changed successfully.**`)

      .setColor(`${a.hexColor}`);
    message.channel.sendEmbed(embed);
    if (!args) return;
    setInterval(function() {});
    let count = 0;
    let ecount = 0;
    for (let x = 1; x < 201; x++) {
      message.member.removeRole(message.guild.roles.find("name", `${x}`));
    }
    message.member.addRole(message.guild.roles.find("name", `${args}`));
  }
});

client.on("message", message => {
  if (message.content === prefix + "createcolors") {
    if (!message.channel.guild) return;
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel
        .send("**You Dont Have** `ADMINISTRATOR` **premission**")
        .then(msg => msg.delete(6000));
    message.guild.createRole({
      name: "1",
      color: "#000001",
      permissions: []
    });
    message.guild.createRole({
      name: "2",
      color: "#0a0a0a",
      permissions: []
    });
    message.guild.createRole({
      name: "3",
      color: "#131313",
      permissions: []
    });
    message.guild.createRole({
      name: "4",
      color: "#1f1f1f",
      permissions: []
    });
    message.guild.createRole({
      name: "5",
      color: "#242424",
      permissions: []
    });
    message.guild.createRole({
      name: "6",
      color: "#333333",
      permissions: []
    });
    message.guild.createRole({
      name: "7",
      color: "#5c5c5c",
      permissions: []
    });
    message.guild.createRole({
      name: "8",
      color: "#797979 ",
      permissions: []
    });
    message.guild.createRole({
      name: "9",
      color: "#a0a0a0",
      permissions: []
    });
    message.guild.createRole({
      name: "10",
      color: "#cecece",
      permissions: []
    });
    message.guild.createRole({
      name: "11",
      color: "#ffffff",
      permissions: []
    });
    message.guild.createRole({
      name: "12",
      color: "#110000",
      permissions: []
    });

    message.guild.createRole({
      name: "13",
      color: "#2c0000",
      permissions: []
    }); //master killer

    message.guild.createRole({
      name: "14",
      color: "#380401",
      permissions: []
    });

    message.guild.createRole({
      name: "15",
      color: "#4b0101",
      permissions: []
    });

    message.guild.createRole({
      name: "16",
      color: "#520000",
      permissions: []
    });

    message.guild.createRole({
      name: "17",
      color: "#580000",
      permissions: []
    });

    message.guild.createRole({
      name: "18",
      color: "#810000",
      permissions: []
    });

    message.guild.createRole({
      name: "19",
      color: "#a00000",
      permissions: []
    });

    message.guild.createRole({
      name: "20",
      color: "#c90000",
      permissions: []
    });

    message.guild.createRole({
      name: "21",
      color: "#f10000",
      permissions: []
    });

    message.guild.createRole({
      name: "22",
      color: "#ff0000",
      permissions: []
    });
    message.guild.createRole({
      name: "23",
      color: "#310d00",
      permissions: []
    });
    message.guild.createRole({
      name: "24",
      color: "#471d00",
      permissions: []
    });

    message.guild.createRole({
      name: "25",
      color: "#632500",
      permissions: []
    });

    message.guild.createRole({
      name: "26",
      color: "#702900",
      permissions: []
    });

    message.guild.createRole({
      name: "27",
      color: "#743300",
      permissions: []
    }); //master killer

    message.guild.createRole({
      name: "28",
      color: "#793600",
      permissions: []
    });
    message.guild.createRole({
      name: "29",
      color: "#8a4600",
      permissions: []
    });

    message.guild.createRole({
      name: "30",
      color: "#b34700",
      permissions: []
    });

    message.guild.createRole({
      name: "31",
      color: "#d86300",
      permissions: []
    });

    message.guild.createRole({
      name: "32",
      color: "#ee6900",
      permissions: []
    });

    message.guild.createRole({
      name: "33",
      color: "#ff8100",
      permissions: []
    });

    message.guild.createRole({
      name: "34",
      color: "#02001a",
      permissions: []
    });

    message.guild.createRole({
      name: "35",
      color: "#040027",
      permissions: []
    });
    message.guild.createRole({
      name: "36",
      color: "#000250",
      permissions: []
    });

    message.guild.createRole({
      name: "37",
      color: "#00006b",
      permissions: []
    });

    message.guild.createRole({
      name: "38",
      color: "#09008b ",
      permissions: []
    });

    message.guild.createRole({
      name: "39",
      color: "#020094",
      permissions: []
    });

    message.guild.createRole({
      name: "40",
      color: "#0005b9",
      permissions: []
    });
    message.guild.createRole({
      name: "41",
      color: "#0f00db",
      permissions: []
    });
    message.guild.createRole({
      name: "42",
      color: "#0300f7",
      permissions: []
    });
    message.guild.createRole({
      name: "43",
      color: "#002bff",
      permissions: []
    });
    message.guild.createRole({
      name: "44",
      color: "#0047ff",
      permissions: []
    });

    message.guild.createRole({
      name: "45",
      color: "#001601",
      permissions: []
    });

    message.guild.createRole({
      name: "46",
      color: "#002501",
      permissions: []
    });

    message.guild.createRole({
      name: "47",
      color: "#052900",
      permissions: []
    });

    message.guild.createRole({
      name: "48",
      color: "#003b03",
      permissions: []
    });

    message.guild.createRole({
      name: "49",
      color: "#005802",
      permissions: []
    });

    message.guild.createRole({
      name: "50",
      color: "#007715",
      permissions: []
    });

    message.guild.createRole({
      name: "51",
      color: "#179600",
      permissions: []
    });

    message.guild.createRole({
      name: "52",
      color: "#00a50e",
      permissions: []
    });

    message.guild.createRole({
      name: "53",
      color: "#00ad06",
      permissions: []
    });

    message.guild.createRole({
      name: "54",
      color: "#00be00",
      permissions: []
    });

    message.guild.createRole({
      name: "55",
      color: "#00ff0f",
      permissions: []
    });

    message.guild.createRole({
      name: "56",
      color: "#292800",
      permissions: []
    });

    message.guild.createRole({
      name: "57",
      color: "#3a3601",
      permissions: []
    });

    message.guild.createRole({
      name: "58",
      color: "#474500",
      permissions: []
    });

    message.guild.createRole({
      name: "59",
      color: "#5e5c00",
      permissions: []
    });

    message.guild.createRole({
      name: "60",
      color: "#818100",
      permissions: []
    });

    message.guild.createRole({
      name: "61",
      color: "#999800",
      permissions: []
    });

    message.guild.createRole({
      name: "62",
      color: "#aca600",
      permissions: []
    });

    message.guild.createRole({
      name: "63",
      color: "#bcc500",
      permissions: []
    });

    message.guild.createRole({
      name: "64",
      color: "#d1d100",
      permissions: []
    });

    message.guild.createRole({
      name: "65",
      color: "#c9d800",
      permissions: []
    });

    message.guild.createRole({
      name: "66",
      color: "#ffee00",
      permissions: []
    });

    message.guild.createRole({
      name: "67",
      color: "#1b0030",
      permissions: []
    });

    message.guild.createRole({
      name: "68",
      color: "#1e003a",
      permissions: []
    });

    message.guild.createRole({
      name: "69",
      color: "#2c004b",
      permissions: []
    });

    message.guild.createRole({
      name: "70",
      color: "#3e005e",
      permissions: []
    });

    message.guild.createRole({
      name: "71",
      color: "#5d0097",
      permissions: []
    });

    message.guild.createRole({
      name: "72",
      color: "#6b009c",
      permissions: []
    });

    message.guild.createRole({
      name: "73",
      color: "#8c00b8",
      permissions: []
    });

    message.guild.createRole({
      name: "74",
      color: "#a200c7",
      permissions: []
    });

    message.guild.createRole({
      name: "75",
      color: "#aa00e0",
      permissions: []
    });

    message.guild.createRole({
      name: "76",
      color: "#cc00db",
      permissions: []
    });

    message.guild.createRole({
      name: "77",
      color: "#e200ff",
      permissions: []
    });

    message.guild.createRole({
      name: "78",
      color: "#4d0037",
      permissions: []
    });

    message.guild.createRole({
      name: "79",
      color: "#660041",
      permissions: []
    });

    message.guild.createRole({
      name: "80",
      color: "#91005c",
      permissions: []
    });

    message.guild.createRole({
      name: "81",
      color: "#b4006a",
      permissions: []
    });

    message.guild.createRole({
      name: "82",
      color: "#ca0076",
      permissions: []
    });

    message.guild.createRole({
      name: "83",
      color: "#cc008e",
      permissions: []
    });

    message.guild.createRole({
      name: "84",
      color: "#d60089",
      permissions: []
    });

    message.guild.createRole({
      name: "85",
      color: "#e900a3",
      permissions: []
    });

    message.guild.createRole({
      name: "86",
      color: "#ff00b3",
      permissions: []
    });

    message.guild.createRole({
      name: "87",
      color: "#ff2dbe",
      permissions: []
    });

    message.guild.createRole({
      name: "88",
      color: "#ff73d4",
      permissions: []
    });

    message.channel.sendMessage({
      embed: new Discord.RichEmbed()
        .setColor("#502faf")
        .setAuthor(`${message.author.username}'`, message.author.avatarURL)
        .setDescription("``Colors Has Been Created ``" + "")
    });
  }
});

client.on("message", msg => {
  if (msg.content === "#colors") {
    msg.channel.send({ file: "colors.png" });
  }
});

client.on("message", message => {
  var prefix = "#";
  if (message.content === prefix + "hide") {
    if (!message.channel.guild)
      return message.reply("** This command only for servers**");

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.reply(" **__ليس لديك صلاحيات__**");
    message.channel
      .overwritePermissions(message.guild.id, {
        READ_MESSAGES: false
      })
      .then(() => {
        message.reply("**__تم اخفاء الشات__ <a:overify:688707812225712152> **");
      });
  }

  if (message.content === prefix + "show") {
    if (!message.channel.guild)
      return message.reply("** This command only for servers**");

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.reply("**__ليس لديك صلاحيات__**");
    message.channel
      .overwritePermissions(message.guild.id, {
        READ_MESSAGES: true
      })
      .then(() => {
        message.reply("**__تم اظهار الشات__<a:overify:688707812225712152>**");
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith(prefix + "bs")) {
    let msg = client.guilds
      .map(guild => `**${guild.name}** عدد الاعضاء: ${guild.memberCount}`)
      .join("\n");
    let embed = new Discord.RichEmbed()
      .setTitle(`${client.guilds.size}سيرفرات `)
      .setDescription(`${msg}`)
      .setColor("black");
    message.channel.send(embed);
  }
});

client.on("message", message => {
  if (message.content.startsWith("#say")) {
    message.delete();
    message.delete();
    message.delete();
    message.delete();
    message.delete();
    message.delete();
    message.delete();
    message.delete();

    let args = message.content.split(" ").slice(1);
    let ar = args.join(" ");

    message.channel.send(ar, { t: true });
  }
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async message => {
  var prefix = "#";
  if (!message.guild || message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  if (message.content.startsWith(prefix + "bc")) {
    if (!message.member.hasPermission("ADMINISTRATOR")) return;
    let args = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    message.channel
      .send(
        ">>> **[1] جميع الاعضاء<a:bc:688710946981806104>\n[2] الاعضاء المتصلين<a:bc:688710946981806104>\n[3] الرتب الخاصة<a:bc:688710946981806104>\n[0] الغاء الأمر<a:bc:688710946981806104>**"
      )
      .then(m => {
        message.channel
          .awaitMessages(msg => msg.author.id === message.author.id, {
            max: 1,
            time: 1000 * 60 * 2,
            errors: ["time"]
          })
          .then(c => {
            if (c.first().content === "1") {
              message.guild.members.forEach(m => {
                m.send(`${args}\n`).catch(err => {
                  if (err) throw err;
                });
              });
              c.first().delete();
              m.delete();
              message.channel.send(
                "**تم نشر الرسالة بنجاح<a:overify:688707812225712152><a:bc:688710946981806104>**"
              );
            }
            if (c.first().content === "2") {
              message.guild.members
                .filter(m => m.presence.status !== "offline")
                .forEach(m => {
                  m.send(`${args}\n`).catch(err => {
                    if (err) throw err;
                  });
                });
              c.first().delete();
              m.delete();
              message.channel.send("**<a:overify:688707812225712152>تم نشر الرسالة بنجاح**");
            }
            if (c.first().content == "0") {
              c.first().delete();
              m.delete();
              message.channel.send("**<a:overify:688707812225712152>تم الغاء الامر بنجاح**");
            }
            if (c.first().content === "3") {
              m.edit("**>>> ادخل اسم الرتبة من فضلك**").then(ms => {
                message.channel
                  .awaitMessages(msg => msg.author.id === message.author.id, {
                    max: 1,
                    time: 1000 * 60 * 2,
                    errors: ["time"]
                  })
                  .then(c => {
                    let role = message.guild.roles.find(
                      role => role.name === c.first().content
                    );
                    if (!role)
                      return message.channel
                        .send(
                          "**:x: لا استطيع العثور على الرتبة الخاصة بالرسالة**"
                        )
                        .then(() => {
                          ms.delete();
                          c.first().delete();
                        });
                    let roleID = role.id;
                    message.guild.roles.get(roleID).members.forEach(m => {
                      m.send(`${args}\n`).catch(err => {
                        if (err) throw err;
                      });
                    });
                    c.first().delete();
                    m.delete();
                    message.channel.send("**تم نشر الرسالة بنجاح<a:overify:688707812225712152>**");
                  });
              });
            }
          })
          .catch(() => m.delete());
      });
  } else if (message.content.startsWith(prefix + "setname")) {
    let args = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (!message.author.id === "") return;
    client.user.setUsername(args);
    message.channel.send(`تم تغيير الاسم الى <a:overify:688707812225712152>..**${args}** `);
  } else if (message.content.startsWith(prefix + "setavatar")) {
    let args = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (!message.author.id === "") return;
    client.user.setAvatar(args).catch(err => message.reply("send a valid url"));
    message.channel.send(`تم تغيير الصورة الى <a:overify:688707812225712152>:**${args}** `);
  }
});

let anti = JSON.parse(fs.readFileSync("./antigreff.json", "UTF8"));
let config = JSON.parse(fs.readFileSync("./config.json", "UTF8"));
client.on("message", message => {
  if (!message.channel.guild) return;
  let user = anti[message.guild.id + message.author.id];
  let num = message.content
    .split(" ")
    .slice(2)
    .join(" ");
  if (!anti[message.guild.id + message.author.id])
    anti[message.guild.id + message.author.id] = {
      actions: 0
    };
  if (!config[message.guild.id])
    config[message.guild.id] = {
      banLimit: 3,
      chaDelLimit: 3,
      roleDelLimit: 3,
      kickLimits: 3,
      roleCrLimits: 3,
      time: 30
    };
  if (message.content.startsWith(prefix + "settings limits")) {
    if (!message.member.hasPermission("MANAGE_GUILD")) return;
    if (message.content.startsWith(prefix + "settings limitsban")) {
      if (!num)
        return message.channel.send("** ⇏ | #settings limitsban [Number] **");
      if (isNaN(num)) return message.channel.send("**⇏ | أرقام فقط ! **");
      config[message.guild.id].banLimit = num;
      message.channel.send(
        `**⇏ | تم التغيير اِلي <a:overify:688707812225712152>: ${config[message.guild.id].banLimit} **`
      );
    }
    if (message.content.startsWith(prefix + "settings limitskick")) {
      if (!num)
        return message.channel.send("** ⇏ | #settings limitskick [Number] **");
      if (isNaN(num)) return message.channel.send("**⇏ | أرقام فقط ! **");
      config[message.guild.id].kickLimits = num;
      message.channel.send(
        `**⇏ | تم التغيير اِلي <a:overify:688707812225712152>: ${config[message.guild.id].kickLimits}**`
      );
    }
    if (message.content.startsWith(prefix + "settings limitsroleD")) {
      if (!num)
        return message.channel.send(
          "** ⇏ | #settings limitsroleD [Number]  **"
        );
      if (isNaN(num)) return message.channel.send("**⇏ | أرقام فقط ! **");
      config[message.guild.id].roleDelLimit = num;
      message.channel.send(
        `**⇏ | تم التغيير اِلي <a:overify:688707812225712152>: ${config[message.guild.id].roleDelLimit}**`
      );
    }
    if (message.content.startsWith(prefix + "settings limitsroleC")) {
      if (!num)
        return message.channel.send("** ⇏ | #settings limitsroleC [Number] **");
      if (isNaN(num)) return message.channel.send("**⇏ | أرقام فقط ! **");
      config[message.guild.id].roleCrLimits = num;
      message.channel.send(
        `**⇏ | تم التغيير اِلي <a:overify:688707812225712152>: ${config[message.guild.id].roleCrLimits}**`
      );
    }
    if (message.content.startsWith(prefix + "settings limitschannelD")) {
      if (!num)
        return message.channel.send(
          "** ⇏ | #settings limitschannelD [Number] **"
        );
      if (isNaN(num)) return message.channel.send("**⇏ | أرقام فقط ! **");
      config[message.guild.id].chaDelLimit = num;
      message.channel.send(
        `**⇏ | تم التغيير اِلي <a:overify:688707812225712152>: ${config[message.guild.id].chaDelLimit}**`
      );
    }
    if (message.content.startsWith(prefix + "settings limitstime")) {
      if (!num)
        return message.channel.send("** ⇏ | #settings imitstime [Number] **");
      if (isNaN(num)) return message.channel.send("**⇏ | أرقام فقط ! **");
      config[message.guild.id].time = num;
      message.channel.send(
        `**⇏ | تم التغيير اِلي <a:overify:688707812225712152>: ${config[message.guild.id].time}**`
      );
    }
    fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(e) {
      if (e) throw e;
    });
    fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(
      e
    ) {
      if (e) throw e;
    });
  }
});
client.on("channelDelete", async channel => {
  const entry1 = await channel.guild
    .fetchAuditLogs({
      type: "CHANNEL_DELETE"
    })
    .then(audit => audit.entries.first());
  console.log(entry1.executor.username);
  const entry = entry1.executor;
  if (!config[channel.guild.id])
    config[channel.guild.id] = {
      banLimit: 3,
      chaDelLimit: 3,
      roleDelLimit: 3,
      kickLimits: 3,
      roleCrLimits: 3
    };
  if (!anti[channel.guild.id + entry.id]) {
    anti[channel.guild.id + entry.id] = {
      actions: 1
    };
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
  } else {
    anti[channel.guild.id + entry.id].actions = Math.floor(
      anti[channel.guild.id + entry.id].actions + 1
    );
    console.log("TETS");
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
    if (
      anti[channel.guild.id + entry.id].actions >=
      config[channel.guild.id].chaDelLimit
    ) {
      channel.guild.members
        .get(entry.id)
        .ban()
        .catch(e =>
          channel.guild.owner.send(
            `**⇏ | ${entry.username} قام بمسح الكثير من الرومات **`
          )
        );
      anti[channel.guild.id + entry.id].actions = "0";
      fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
      fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
    }
  }

  fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(e) {
    if (e) throw e;
  });
  fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(e) {
    if (e) throw e;
  });
});

client.on("roleDelete", async channel => {
  const entry1 = await channel.guild
    .fetchAuditLogs({
      type: "ROLE_DELETE"
    })
    .then(audit => audit.entries.first());
  console.log(entry1.executor.username);
  const entry = entry1.executor;
  if (!config[channel.guild.id])
    config[channel.guild.id] = {
      banLimit: 3,
      chaDelLimit: 3,
      roleDelLimit: 3,
      kickLimits: 3,
      roleCrLimits: 3
    };
  if (!anti[channel.guild.id + entry.id]) {
    anti[channel.guild.id + entry.id] = {
      actions: 1
    };
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
  } else {
    anti[channel.guild.id + entry.id].actions = Math.floor(
      anti[channel.guild.id + entry.id].actions + 1
    );
    console.log("TETS");
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
    if (
      anti[channel.guild.id + entry.id].actions >=
      config[channel.guild.id].roleDelLimit
    ) {
      channel.guild.members
        .get(entry.id)
        .ban()
        .catch(e =>
          channel.guild.owner.send(
            `**⇏ | ${entry.username} قام بمسح الكثير من الرتب **`
          )
        );
      anti[channel.guild.id + entry.id].actions = "0";
      fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
      fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
    }
  }

  fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(e) {
    if (e) throw e;
  });
  fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(e) {
    if (e) throw e;
  });
});

client.on("roleCreate", async channel => {
  const entry1 = await channel.guild
    .fetchAuditLogs({
      type: "ROLE_CREATE"
    })
    .then(audit => audit.entries.first());
  console.log(entry1.executor.username);
  const entry = entry1.executor;
  if (!config[channel.guild.id])
    config[channel.guild.id] = {
      banLimit: 3,
      chaDelLimit: 3,
      roleDelLimit: 3,
      kickLimits: 3,
      roleCrLimits: 3
    };
  if (!anti[channel.guild.id + entry.id]) {
    anti[channel.guild.id + entry.id] = {
      actions: 1
    };
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
  } else {
    anti[channel.guild.id + entry.id].actions = Math.floor(
      anti[channel.guild.id + entry.id].actions + 1
    );
    console.log("TETS");
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
    if (
      anti[channel.guild.id + entry.id].actions >=
      config[channel.guild.id].roleCrLimits
    ) {
      channel.guild.members
        .get(entry.id)
        .ban()
        .catch(e =>
          channel.guild.owner.send(
            `**⇏ | ${entry.username} قام بأنشاء الكثير من الرتب **`
          )
        );
      anti[channel.guild.id + entry.id].actions = "0";
      fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
      fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
    }
  }

  fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(e) {
    if (e) throw e;
  });
  fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(e) {
    if (e) throw e;
  });
});

client.on("guildBanAdd", async (guild, user) => {
  const entry1 = await channel.guild
    .fetchAuditLogs({
      type: "MEMBER_BAN_ADD"
    })
    .then(audit => audit.entries.first());
  console.log(entry1.executor.username);
  const entry = entry1.executor;
  if (!config[guild.id])
    config[guild.id] = {
      banLimit: 3,
      chaDelLimit: 3,
      roleDelLimit: 3,
      kickLimits: 3,
      roleCrLimits: 3
    };
  if (!anti[guild.id + entry.id]) {
    anti[guild.id + entry.id] = {
      actions: 1
    };
    setTimeout(() => {
      anti[guild.id + entry.id].actions = "0";
    }, config[guild.id].time * 1000);
  } else {
    anti[guild.id + entry.id].actions = Math.floor(
      anti[guild.id + entry.id].actions + 1
    );
    console.log("TETS");
    setTimeout(() => {
      anti[guild.id + entry.id].actions = "0";
    }, config[guild.id].time * 1000);
    if (anti[guild.id + entry.id].actions >= config[guild.id].banLimit) {
      channel.members
        .get(entry.id)
        .ban()
        .catch(e =>
          channel.owner.send(`**⇏ | ${entry.username} حاول حظر جميع الأعضاء **`)
        );
      anti[guild.id + entry.id].actions = "0";
      fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
      fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
    }
  }

  fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(e) {
    if (e) throw e;
  });
  fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(e) {
    if (e) throw e;
  });
});

client.on("guildKickAdd", async (guild, user) => {
  const entry1 = await channel
    .fetchAuditLogs({
      type: "MEMBER_KICK"
    })
    .then(audit => audit.entries.first());
  console.log(entry1.executor.username);
  const entry = entry1.executor;
  if (!config[guild.id])
    config[guild.id] = {
      banLimit: 3,
      chaDelLimit: 3,
      roleDelLimit: 3,
      kickLimits: 3,
      roleCrLimits: 3
    };
  if (!anti[guild.id + entry.id]) {
    anti[guild.id + entry.id] = {
      actions: 1
    };
    setTimeout(() => {
      anti[guild.id + entry.id].actions = "0";
    }, config[guild.id].time * 1000);
  } else {
    anti[guild.id + entry.id].actions = Math.floor(
      anti[guild.id + entry.id].actions + 1
    );
    console.log("TETS");
    setTimeout(() => {
      anti[guild.id + entry.id].actions = "0";
    }, config[guild.id].time * 1000);
    if (anti[guild.id + entry.id].actions >= config[guild.id].banLimit) {
      channel.members
        .get(entry.id)
        .ban()
        .catch(e =>
          channel.owner.send(`**⇏ | ${entry.username} حاول حظر جميع الأعضاء **`)
        );
      anti[guild.id + entry.id].actions = "0";
      fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
      fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
    }
  }

  fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(e) {
    if (e) throw e;
  });
  fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(e) {
    if (e) throw e;
  });
});

client.on("guildMemberRemove", async member => {
  const entry1 = await member.guild
    .fetchAuditLogs()
    .then(audit => audit.entries.first());
  if (entry1.action === "MEMBER_KICK") {
    const entry2 = await member.guild
      .fetchAuditLogs({
        type: "MEMBER_KICK"
      })
      .then(audit => audit.entries.first());
    const entry = entry2.executor;
    if (!config[member.guild.id])
      config[guild.id] = {
        banLimit: 3,
        chaDelLimit: 3,
        roleDelLimit: 3,
        kickLimits: 3,
        roleCrLimits: 3
      };
    if (!anti[member.guild.id + entry.id]) {
      anti[member.guild.id + entry.id] = {
        actions: 1
      };
      setTimeout(() => {
        anti[member.guild.id + entry.id].actions = "0";
      }, config[member.guild.id].time * 1000);
    } else {
      anti[member.guild.id + entry.id].actions = Math.floor(
        anti[member.guild.id + entry.id].actions + 1
      );
      console.log("TETS");
      setTimeout(() => {
        anti[member.guild.id + entry.id].actions = "0";
      }, config[member.guild.id].time * 1000);
      if (
        anti[member.guild.id + entry.id].actions >=
        config[member.guild.id].kickLimits
      ) {
        member.members
          .get(entry.id)
          .ban()
          .catch(e =>
            member.owner.send(
              `**⇏ | ${entry.username} حاول حظر جميع الأعضاء **`
            )
          );
        anti[member.guild.id + entry.id].actions = "0";
        fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(
          e
        ) {
          if (e) throw e;
        });
        fs.writeFile(
          "./antigreff.json",
          JSON.stringify(anti, null, 2),
          function(e) {
            if (e) throw e;
          }
        );
      }
    }

    fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(e) {
      if (e) throw e;
    });
    fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(
      e
    ) {
      if (e) throw e;
    });
  }
});

client.on("message", message => {
  if (message.content.startsWith(prefix + "server")) {
    if (!message.channel.guild) return message.reply(" ");
    const millis = new Date().getTime() - message.guild.createdAt.getTime();
    const now = new Date();
    dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
    const verificationLevels = ["None", "Low", "Medium", "Insane", "Extreme"];
    const days = millis / 1000 / 60 / 60 / 24;
    let roles = client.guilds.get(message.guild.id).roles.map(r => r.name);
    var embed = new Discord.RichEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL)
      .addField("**🆔 Server ID:**", message.guild.id, true)
      .addField(
        "**📅 Created On**",
        message.guild.createdAt.toLocaleString(),
        true
      )
      .addField(
        "**👑 Owned by**",
        `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`
      )
      .addField("**👥 Members**", `[${message.guild.memberCount}]`, true)
      .addField(
        "**💬 Channels **",
        `**${message.guild.channels.filter(m => m.type === "text").size}**` +
          " text | Voice  " +
          `**${message.guild.channels.filter(m => m.type === "voice").size}** `,
        true
      )
      .addField("**🌍 Others **", message.guild.region, true)
      .addField(
        "**🔐 Roles **",
        `**[${message.guild.roles.size}]** Role `,
        true
      )
      .setColor("#000000");
    message.channel.sendEmbed(embed);
  }
});

client.on("message", message => {
  if (message.content.startsWith("#new")) {
    const reason = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (!message.guild.roles.exists("name", "Support"))
      return message.channel.send(`Role Create Support`);
    if (
      message.guild.channels.exists(
        "name",
        "ticket-{message.author.id}" + message.author.id
      )
    )
      return message.channel.send(`You already have a ticket open.`);
    message.guild
      .createChannel(`ticket-${message.author.username}`, "text")
      .then(c => {
        let role = message.guild.roles.find("name", "Support");
        let role2 = message.guild.roles.find("name", "@everyone");
        c.overwritePermissions(role, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
        });
        c.overwritePermissions(role2, {
          SEND_MESSAGES: false,
          READ_MESSAGES: false
        });
        c.overwritePermissions(message.author, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
        });
        message.channel.send(
          `:white_check_mark: Your ticket has been created, #${c.name}.`
        );
        const embed = new Discord.RichEmbed()
          .setColor(0xcf40fa)
          .addField(
            `Hey ${message.author.username}!`,
            `Please try explain why you opened this ticket with as much detail as possible. Our **Support Staff** will be here soon to help.`
          )
          .setTimestamp();
        c.send({
          embed: embed
        });
      })
      .catch(console.error);
  }

  if (message.content.startsWith("#close")) {
    if (!message.channel.name.startsWith(`ticket-`))
      return message.channel.send(
        `You can't use the close command outside of a ticket channel.`
      );

    message.channel
      .send(
        `Are you sure? Once confirmed, you cannot reverse this action!\nTo confirm, type \`#confirm\`. This will time out in 10 seconds and be cancelled.`
      )
      .then(m => {
        message.channel
          .awaitMessages(response => response.content === "#confirm", {
            max: 1,
            time: 10000,
            errors: ["time"]
          })
          .then(collected => {
            message.channel.delete();
          })
          .catch(() => {
            m.edit("Ticket close timed out, the ticket was not closed.").then(
              m2 => {
                m2.delete();
              },
              3000
            );
          });
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith("#link")) {
    message.channel
      .createInvite({
        thing: true,
        maxUses: 100,
        maxAge: 86400
      })
      .then(invite => message.author.sendMessage(invite.url));
    message.channel.send("**:link:.<a:overify:688707812225712152>تم ارسال الرابط برسالة خاصة**");

    message.author.send(`**مدة الرابط : يـوم
عدد استخدامات الرابط : 100**`);
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  if (!message.channel.guild) return;
  if (message.content.startsWith(prefix + "setlog")) {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.reply("**تحتاج الى `MANAGE_CHANNELS`**");
    let log = message.guild.channels.find("name", "log");
    if (log) return message.reply("**يوجد بالفعل روم اللوق**");
    if (!log) {
      message.guild.createChannel("log", "text").then(c => {
        c.overwritePermissions(message.guild.id, {
          SEND_MESSAGES: false
        });
      });
      message.channel.send("**<a:overify:688707812225712152> ,تم انشاء روم اللوق بنجــاح**");
    }
  }
});
client.on("error", console.error);

client.on("messageDelete", message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (!message.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES"))
    return;

  var logChannel = message.guild.channels.find(c => c.name === "log");
  if (!logChannel) return;

  let messageDelete = new Discord.RichEmbed()
    .setTitle("**[MESSAGE DELETE]**")
    .setColor("RED")
    .setThumbnail(message.author.avatarURL)
    .setDescription(
      `**\n**:wastebasket: Successfully <a:overify:688707812225712152>\`\`DELETE\`\` **MESSAGE** In ${message.channel}\n\n**Channel:** \`\`${message.channel.name}\`\` (ID: ${message.channel.id})\n**Message ID:** ${message.id}\n**Sent By:** <@${message.author.id}> (ID: ${message.author.id})\n**Message:**\n\`\`\`${message}\`\`\``
    )
    .setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL);

  logChannel.send(messageDelete);
});
client.on("messageUpdate", (oldMessage, newMessage) => {
  if (oldMessage.author.bot) return;
  if (!oldMessage.channel.type === "dm") return;
  if (!oldMessage.guild.member(client.user).hasPermission("EMBED_LINKS"))
    return;
  if (!oldMessage.guild.member(client.user).hasPermission("MANAGE_MESSAGES"))
    return;

  var logChannel = oldMessage.guild.channels.find(c => c.name === "log");
  if (!logChannel) return;

  if (oldMessage.content.startsWith("https://")) return;

  let messageUpdate = new Discord.RichEmbed()
    .setTitle("**[MESSAGE EDIT]**")
    .setThumbnail(oldMessage.author.avatarURL)
    .setColor("BLUE")
    .setDescription(
      `**\n**:wrench: Successfully <a:overify:688707812225712152>\`\`EDIT\`\` **MESSAGE** In ${oldMessage.channel}\n\n**Channel:** \`\`${oldMessage.channel.name}\`\` (ID: ${oldMessage.channel.id})\n**Message ID:** ${oldMessage.id}\n**Sent By:** <@${oldMessage.author.id}> (ID: ${oldMessage.author.id})\n\n**Old Message:**\`\`\`${oldMessage}\`\`\`\n**New Message:**\`\`\`${newMessage}\`\`\``
    )
    .setTimestamp()
    .setFooter(oldMessage.guild.name, oldMessage.guild.iconURL);

  logChannel.send(messageUpdate);
});

client.on("roleCreate", role => {
  if (!role.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!role.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;

  var logChannel = role.guild.channels.find(c => c.name === "log");
  if (!logChannel) return;

  role.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    let roleCreate = new Discord.RichEmbed()
      .setTitle("**[ROLE CREATE]**")
      .setThumbnail(userAvatar)
      .setDescription(
        `**\n**:white_check_mark: Successfully <a:overify:688707812225712152>\`\`CREATE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setColor("GREEN")
      .setTimestamp()
      .setFooter(role.guild.name, role.guild.iconURL);

    logChannel.send(roleCreate);
  });
});
client.on("roleDelete", role => {
  if (!role.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!role.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;

  var logChannel = role.guild.channels.find(c => c.name === "log");
  if (!logChannel) return;

  role.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    let roleDelete = new Discord.RichEmbed()
      .setTitle("**[ROLE DELETE]**")
      .setThumbnail(userAvatar)
      .setDescription(
        `**\n**:white_check_mark: Successfully <a:overify:688707812225712152>\`\`DELETE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setColor("RED")
      .setTimestamp()
      .setFooter(role.guild.name, role.guild.iconURL);

    logChannel.send(roleDelete);
  });
});
client.on("roleUpdate", (oldRole, newRole) => {
  if (!oldRole.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!oldRole.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
    return;

  var logChannel = oldRole.guild.channels.find(c => c.name === "log");
  if (!logChannel) return;

  oldRole.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    if (oldRole.name !== newRole.name) {
      let roleUpdateName = new Discord.RichEmbed()
        .setTitle("**[ROLE NAME UPDATE]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:white_check_mark: Successfully <a:overify:688707812225712152>\`\`EDITED\`\` Role Name.\n\n**Old Name:** \`\`${oldRole.name}\`\`\n**New Name:** \`\`${newRole.name}\`\`\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldRole.guild.name, oldRole.guild.iconURL);

      logChannel.send(roleUpdateName);
    }
    if (oldRole.hexColor !== newRole.hexColor) {
      if (oldRole.hexColor === "#000000") {
        var oldColor = "`Default`";
      } else {
        var oldColor = oldRole.hexColor;
      }
      if (newRole.hexColor === "#000000") {
        var newColor = "`Default`";
      } else {
        var newColor = newRole.hexColor;
      }
      let roleUpdateColor = new Discord.RichEmbed()
        .setTitle("**[ROLE COLOR UPDATE]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:white_check_mark: Successfully <a:overify:688707812225712152>\`\`EDITED\`\` **${oldRole.name}** Role Color.\n\n**Old Color:** ${oldColor}\n**New Color:** ${newColor}\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldRole.guild.name, oldRole.guild.iconURL);

      logChannel.send(roleUpdateColor);
    }
    if (oldRole.permissions !== newRole.permissions) {
      let roleUpdate = new Discord.RichEmbed()
        .setTitle("**[UPDATE ROLE PERMISSIONS]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:first_place: Successfully <a:overify:688707812225712152>\`\`CHANGED\`\` **${oldRole.name}** Permissions!\n\n**Old Permissions:** \`\`${oldRole.permissions}\`\`\n**New Permissions:** \`\`${newRole.permissions}\`\`\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldRole.guild.name, oldRole.guild.iconURL);

      logChannel.send(roleUpdate);
    }
  });
});

client.on("channelCreate", channel => {
  if (!channel.guild) return;
  if (!channel.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!channel.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
    return;

  var logChannel = channel.guild.channels.find(c => c.name === "log");
  if (!logChannel) return;

  if (channel.type === "text") {
    var roomType = "Text";
  } else if (channel.type === "voice") {
    var roomType = "Voice";
  } else if (channel.type === "category") {
    var roomType = "Category";
  }

  channel.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    let channelCreate = new Discord.RichEmbed()
      .setTitle("**[CHANNEL CREATE]**")
      .setThumbnail(userAvatar)
      .setDescription(
        `**\n**:white_check_mark: Successfully <a:overify:688707812225712152>\`\`CREATE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setColor("GREEN")
      .setTimestamp()
      .setFooter(channel.guild.name, channel.guild.iconURL);

    logChannel.send(channelCreate);
  });
});
client.on("channelDelete", channel => {
  if (!channel.guild) return;
  if (!channel.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!channel.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
    return;

  var logChannel = channel.guild.channels.find(c => c.name === "log");
  if (!logChannel) return;

  if (channel.type === "text") {
    var roomType = "Text";
  } else if (channel.type === "voice") {
    var roomType = "Voice";
  } else if (channel.type === "category") {
    var roomType = "Category";
  }

  channel.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    let channelDelete = new Discord.RichEmbed()
      .setTitle("**[CHANNEL DELETE]**")
      .setThumbnail(userAvatar)
      .setDescription(
        `**\n**:white_check_mark: Successfully<a:overify:688707812225712152> \`\`DELETE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setColor("RED")
      .setTimestamp()
      .setFooter(channel.guild.name, channel.guild.iconURL);

    logChannel.send(channelDelete);
  });
});
client.on("channelUpdate", (oldChannel, newChannel) => {
  if (!oldChannel.guild) return;

  var logChannel = oldChannel.guild.channels.find(c => c.name === "log");
  if (!logChannel) return;

  if (oldChannel.type === "text") {
    var channelType = "Text";
  } else if (oldChannel.type === "voice") {
    var channelType = "Voice";
  } else if (oldChannel.type === "category") {
    var channelType = "Category";
  }

  oldChannel.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    if (oldChannel.name !== newChannel.name) {
      let newName = new Discord.RichEmbed()
        .setTitle("**[CHANNEL EDIT]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:wrench: Successfully Edited <a:overify:688707812225712152>**${channelType}** Channel Name\n\n**Old Name:** \`\`${oldChannel.name}\`\`\n**New Name:** \`\`${newChannel.name}\`\`\n**Channel ID:** ${oldChannel.id}\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldChannel.guild.name, oldChannel.guild.iconURL);

      logChannel.send(newName);
    }
    if (oldChannel.topic !== newChannel.topic) {
      let newTopic = new Discord.RichEmbed()
        .setTitle("**[CHANNEL EDIT]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:wrench: Successfully Edited <a:overify:688707812225712152>**${channelType}** Channel Topic\n\n**Old Topic:**\n\`\`\`${oldChannel.topic ||
            "NULL"}\`\`\`\n**New Topic:**\n\`\`\`${newChannel.topic ||
            "NULL"}\`\`\`\n**Channel:** ${oldChannel} (ID: ${
            oldChannel.id
          })\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldChannel.guild.name, oldChannel.guild.iconURL);

      logChannel.send(newTopic);
    }
  });
});

client.on("guildBanAdd", (guild, user) => {
  if (!guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;

  var logChannel = guild.channels.find(c => c.name === "log");
  if (!logChannel) return;

  guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    if (userID === client.user.id) return;

    let banInfo = new Discord.RichEmbed()
      .setTitle("**[BANNED]**")
      .setThumbnail(userAvatar)
      .setColor("DARK_RED")
      .setDescription(
        `**\n**:airplane: Successfully <a:overify:688707812225712152>\`\`BANNED\`\` **${user.username}** From the server!\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setTimestamp()
      .setFooter(guild.name, guild.iconURL);

    logChannel.send(banInfo);
  });
});
client.on("guildBanRemove", (guild, user) => {
  if (!guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;

  var logChannel = guild.channels.find(c => c.name === "log");
  if (!logChannel) return;

  guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    let unBanInfo = new Discord.RichEmbed()
      .setTitle("**[UNBANNED]**")
      .setThumbnail(userAvatar)
      .setColor("GREEN")
      .setDescription(
        `**\n**:unlock: Successfully <a:overify:688707812225712152>\`\`UNBANNED\`\` **${user.username}** From the server\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setTimestamp()
      .setFooter(guild.name, guild.iconURL);

    logChannel.send(unBanInfo);
  });
});
client.on("guildMemberUpdate", (oldMember, newMember) => {
  var logChannel = oldMember.guild.channels.find(c => c.name === "log");
  if (!logChannel) return;

  oldMember.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;
    var userTag = logs.entries.first().executor.tag;

    if (oldMember.nickname !== newMember.nickname) {
      if (oldMember.nickname === null) {
        var oldNM = "``اسمه الاصلي``";
      } else {
        var oldNM = oldMember.nickname;
      }
      if (newMember.nickname === null) {
        var newNM = "``اسمه الاصلي``";
      } else {
        var newNM = newMember.nickname;
      }

      let updateNickname = new Discord.RichEmbed()
        .setTitle("**[UPDATE MEMBER NICKNAME]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:spy: Successfully <a:overify:688707812225712152>\`\`CHANGE\`\` Member Nickname.\n\n**User:** ${oldMember} (ID: ${oldMember.id})\n**Old Nickname:** ${oldNM}\n**New Nickname:** ${newNM}\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldMember.guild.name, oldMember.guild.iconURL);

      logChannel.send(updateNickname);
    }
    if (oldMember.roles.size < newMember.roles.size) {
      let role = newMember.roles
        .filter(r => !oldMember.roles.has(r.id))
        .first();

      let roleAdded = new Discord.RichEmbed()
        .setTitle("**[ADDED ROLE TO MEMBER]**")
        .setThumbnail(oldMember.guild.iconURL)
        .setColor("GREEN")
        .setDescription(
          `**\n**:white_check_mark: Successfully <a:overify:688707812225712152>\`\`ADDED\`\` Role to **${oldMember.user.username}**\n\n**User:** <@${oldMember.id}> (ID: ${oldMember.user.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(roleAdded);
    }
    if (oldMember.roles.size > newMember.roles.size) {
      let role = oldMember.roles
        .filter(r => !newMember.roles.has(r.id))
        .first();

      let roleRemoved = new Discord.RichEmbed()
        .setTitle("**[REMOVED ROLE FROM MEMBER]**")
        .setThumbnail(oldMember.guild.iconURL)
        .setColor("RED")
        .setDescription(
          `**\n**:negative_squared_cross_mark: Successfully<a:overify:688707812225712152> \`\`REMOVED\`\` Role from **${oldMember.user.username}**\n\n**User:** <@${oldMember.user.id}> (ID: ${oldMember.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(roleRemoved);
    }
  });
  if (oldMember.guild.owner.user.id !== newMember.guild.owner.user.id) {
    let newOwner = new Discord.RichEmbed()
      .setTitle("**[UPDATE GUILD OWNER]**")
      .setThumbnail(oldMember.guild.iconURL)
      .setColor("GREEN")
      .setDescription(
        `**\n**:white_check_mark: Successfully <a:overify:688707812225712152>\`\`TRANSFER\`\` The Owner Ship.\n\n**Old Owner:** <@${oldMember.user.id}> (ID: ${oldMember.user.id})\n**New Owner:** <@${newMember.user.id}> (ID: ${newMember.user.id})`
      )
      .setTimestamp()
      .setFooter(oldMember.guild.name, oldMember.guild.iconURL);

    logChannel.send(newOwner);
  }
});
client.on("guildMemberAdd", member => {
  var logChannel = member.guild.channels.find(c => c.name === "𝗪elcome");
  if (!logChannel) return;

  let newMember = new Discord.RichEmbed()
    .setTitle("**[NEW MEMBER ADDED]**")
    .setThumbnail(member.user.avatarURL)
    .setColor("GREEN")
    .setDescription(
      `**\n**:arrow_lower_right: Joined **${
        member.user.username
      }** To the server!\n\n**User:** <@${member.user.id}> (ID: ${
        member.user.id
      })\n**Days In Discord:** ${Days(member.user.createdAt)}`
    )
    .setTimestamp()
    .setFooter(member.user.tag, member.user.avatarURL);

  logChannel.send(newMember);
});
function Days(date) {
  let now = new Date();
  let diff = now.getTime() - date.getTime();
  let days = Math.floor(diff / 86400000);
  return days + (days == 1 ? " day" : " days") + " ago";
}
client.on("guildMemberRemove", member => {
  var logChannel = member.guild.channels.find(c => c.name === "𝗪elcome");
  if (!logChannel) return;

  let leaveMember = new Discord.RichEmbed()
    .setTitle("**[LEAVE MEMBER]**")
    .setThumbnail(member.user.avatarURL)
    .setColor("GREEN")
    .setDescription(
      `**\n**:arrow_upper_left: Leave **${member.user.username}** From the server.\n\n**User:** <@${member.user.id}> (ID: ${member.user.id})`
    )
    .setTimestamp()
    .setFooter(member.user.tag, member.user.avatarURL);

  logChannel.send(leaveMember);
});

client.on("voiceStateUpdate", (voiceOld, voiceNew) => {
  if (!voiceOld.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!voiceOld.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
    return;

  var logChannel = voiceOld.guild.channels.find(c => c.name === "log");
  if (!logChannel) return;

  voiceOld.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userTag = logs.entries.first().executor.tag;
    var userAvatar = logs.entries.first().executor.avatarURL;

    if (voiceOld.serverMute === false && voiceNew.serverMute === true) {
      let serverMutev = new Discord.RichEmbed()
        .setTitle("**[VOICE MUTE]**")
        .setThumbnail(
          "https://images-ext-1.discordapp.net/external/pWQaw076OHwVIFZyeFoLXvweo0T_fDz6U5C9RBlw_fQ/https/cdn.pg.sa/UosmjqDNgS.png"
        )
        .setColor("RED")
        .setDescription(
          `**User:** <@${voiceOld.user.id}> (ID: ${voiceOld.user.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(serverMutev);
    }

    if (voiceOld.serverMute === true && voiceNew.serverMute === false) {
      let serverUnmutev = new Discord.RichEmbed()
        .setTitle("**[VOICE UNMUTE]**")
        .setThumbnail(
          "https://images-ext-1.discordapp.net/external/u2JNOTOc1IVJGEb1uCKRdQHXIj5-r8aHa3tSap6SjqM/https/cdn.pg.sa/Iy4t8H4T7n.png"
        )
        .setColor("GREEN")
        .setDescription(
          `**User:** <@${voiceOld.user.id}> (ID: ${voiceOld.user.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(serverUnmutev);
    }

    if (voiceOld.serverDeaf === false && voiceNew.serverDeaf === true) {
      let serverDeafv = new Discord.RichEmbed()
        .setTitle("**[VOICE DEAFEN]**")
        .setThumbnail(
          "https://images-ext-1.discordapp.net/external/7ENt2ldbD-3L3wRoDBhKHb9FfImkjFxYR6DbLYRjhjA/https/cdn.pg.sa/auWd5b95AV.png"
        )
        .setColor("RED")
        .setDescription(
          `**User:** <@${voiceOld.user.id}> (ID: ${voiceOld.user.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(serverDeafv);
    }

    if (voiceOld.serverDeaf === true && voiceNew.serverDeaf === false) {
      let serverUndeafv = new Discord.RichEmbed()
        .setTitle("**[VOICE UNDEAFEN]**")
        .setThumbnail(
          "https://images-ext-2.discordapp.net/external/s_abcfAlNdxl3uYVXnA2evSKBTpU6Ou3oimkejx3fiQ/https/cdn.pg.sa/i7fC8qnbRF.png"
        )
        .setColor("GREEN")
        .setDescription(
          `**User:** <@${voiceOld.user.id}> (ID: ${voiceOld.user.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(serverUndeafv);
    }
  });

  if (
    voiceOld.voiceChannelID !== voiceNew.voiceChannelID &&
    !voiceOld.voiceChannel
  ) {
    let voiceJoin = new Discord.RichEmbed()
      .setTitle("**[JOIN VOICE ROOM]**")
      .setColor("GREEN")
      .setThumbnail(voiceOld.user.avatarURL)
      .setDescription(
        `**\n**:arrow_lower_right: Successfully <a:overify:688707812225712152>\`\`JOIN\`\` To Voice Channel.\n\n**Channel:** \`\`${voiceNew.voiceChannel.name}\`\` (ID: ${voiceNew.voiceChannelID})\n**User:** ${voiceOld} (ID: ${voiceOld.id})`
      )
      .setTimestamp()
      .setFooter(voiceOld.user.tag, voiceOld.user.avatarURL);

    logChannel.send(voiceJoin);
  }

  if (
    voiceOld.voiceChannelID !== voiceNew.voiceChannelID &&
    !voiceNew.voiceChannel
  ) {
    let voiceLeave = new Discord.RichEmbed()
      .setTitle("**[LEAVE VOICE ROOM]**")
      .setColor("GREEN")
      .setThumbnail(voiceOld.user.avatarURL)
      .setDescription(
        `**\n**:arrow_upper_left: Successfully<a:overify:688707812225712152> \`\`LEAVE\`\` From Voice Channel.\n\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannelID})\n**User:** ${voiceOld} (ID: ${voiceOld.id})`
      )
      .setTimestamp()
      .setFooter(voiceOld.user.tag, voiceOld.user.avatarURL);

    logChannel.send(voiceLeave);
  }

  if (
    voiceOld.voiceChannelID !== voiceNew.voiceChannelID &&
    voiceNew.voiceChannel &&
    voiceOld.voiceChannel != null
  ) {
    let voiceLeave = new Discord.RichEmbed()
      .setTitle("**[CHANGED VOICE ROOM]**")
      .setColor("GREEN")
      .setThumbnail(voiceOld.user.avatarURL)
      .setDescription(
        `**\n**:repeat: Successfully <a:overify:688707812225712152>\`\`CHANGED\`\` The Voice Channel.\n\n**From:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannelID})\n**To:** \`\`${voiceNew.voiceChannel.name}\`\` (ID: ${voiceNew.voiceChannelID})\n**User:** ${voiceOld} (ID: ${voiceOld.id})`
      )
      .setTimestamp()
      .setFooter(voiceOld.user.tag, voiceOld.user.avatarURL);

    logChannel.send(voiceLeave);
  }
});

const cuttweet = [
  "كت تويت ‏- تخيّل لو أنك سترسم شيء وحيد فيصبح حقيقة، ماذا سترسم؟",
  "كت تويت ‏- أكثر شيء يُسكِت الطفل برأيك؟",
  "كت تويت ‏- الحرية لـ ... ؟",
  "كت تويت ‏- قناة الكرتون المفضلة في طفولتك؟",
  "كت تويت ‏- كلمة للصُداع؟",
  "كت تويت ‏- ما الشيء الذي يُفارقك؟",
  "كت تويت ‏- ما الشيء الذي يُفارقك؟",
  "كت تويت ‏- موقف مميز فعلته مع شخص ولا يزال يذكره لك؟",
  "كت تويت ‏- أيهما ينتصر، الكبرياء أم الحب؟",
  "كت ��ويت| بعد ١٠ سنين ايش بتكون ؟",
  "كت تويت ‏- مِن أغرب وأجمل الأسماء التي مرت عليك؟",
  "‏كت تويت| عمرك شلت مصيبة عن شخص برغبتك ؟",
  "كت تويت ‏- أكثر سؤال وجِّه إليك مؤخرًا؟",
  "‏كت تويت|ما هو الشيء الذي يجعلك تشعر بالخوف؟",
  "‏كت تويت|وش يفسد الصداقة؟",
  "‏كت تويت|كم مره خسرت شخص تحبه؟.",
  "‏كت تويت|كيف تتعامل مع الاشخاص السلبيين ؟",
  "‏كت تويت|كلمة تشعر بالخجل اذا قيلت لك؟",
  "‏كت تويت|هل تُخفي نجاحك أو كت كت تويت | هل تخفي نجاحك أو أشيائك الجميلة خوفاً من العين والحسد؟",
  "‏كت تويت|جسمك اكبر من عٌ��رك او ��لعكسّ ؟!",
  "‏كت تويت|أقوى كذبة مشت عليك ؟",
  "‏كت تويت|تتأثر بدموع شخص يبكي قدامك قبل تعرف السبب ؟",
  "كت تويت|هل حدث وضحيت من أجل شخصٍ أحببت؟",
  "‏كت تويت|أكثر تطبيق تستخدمه مؤخرًا؟",
  "‏كت تويت|‏اكثر شي يرضيك اذا زعلت بدون تفكير ؟",
  "‏كت تويت|وش محتاج عشان تكون مبسوط ؟",
  "‏كت تويت|مطلبك الوحيد الحين ؟",
  "‏كت تويت|- ه�� حدث وشعرت بأنك ارتكبت أحد الذنوب أثناء الصيام؟"
];

client.on("message", message => {
  if (message.content === `#Tweets`) {
    message.channel.sendMessage({
      embed: {
        color: 3547003,
        description: `${cuttweet[Math.floor(Math.random() * cuttweet.length)]}`
      }
    });
  }
});

const secre = [
  "**لو خيروك بين العيش وحدك في جزيرة كبيرة منعزلة مع أكبر درجات الرفاهية وبين العيش في مكان قديم ولكن مع أصدقائك المقربين**.",
  "**لو خيروك بين فقدان ذاكرتك والعيش مع أصدقائك وأقربائك أو بقاء ذاكرتك ولكن العيش وحيد**.",
  "**للو خيروك بين تناول الخضار والفاكهة طوال حياتك أو تناول اللحوم**.",
  "**لو خيروك بين رؤية الأشباح فقط أو سماع صوتها فقط**.",
  "**لو خيروك بين القدرة على سماع أفكار الناس أو القدرة على العودة في الزمن للخلف**.",
  "**لو خيروك بين القدرة على الاختفاء أو القدرة على الطيران**.",
  "**لو خيروك بين أن تعيش 5 دقائق في الماضي أو أن تعيشها في المستقبل**.",
  "**لو خيروك بين 5 ملايين دولار أو 5 ملايين لحظة سعادة حقيقيةا**.",
  "**لو خيروك بين الاعتذار عن خطأ اقترفته أو أن يقدم لك شخص أخطأ في حقق اعتذار**.",
  "**لو خيروك بين الحقد أو المسامحة**.",
  "**لو خيروك بين إنقاذ نفسك أو إنقاذ شخص وقد يعرضك ذلك للأذى**.",
  "**لو خيروك بين أن تعيش في القرن الرابع عشر أو القرن الحالي**.",
  "**لو خيروك بين امتلاك سرعة الفهد أو دهاء الثعلب**.",
  "**لو خيروك بين أن تحصل على درجة كاملة في كامل اختباراتك القادمة والسابقة أو أن تسافر إلى بلد تحبه**.",
  "**لو خيروك بين العيش بجانب الجبال والحدائق والأشجار أو العيش بجانب البحر**.",
  "**لو خيروك بين تحقيق 3 أمنيات (لا تتعلق بأشخاص) أو اختيار 3 أشخاص للعيش معهم طوال حياتك**.",
  "**لو خيروك بين النوم في غابة مظلمة أو على ظهر سفينة في يوم عاصف**.",
  "**لو خيروك بين المال أو الجمال**.",
  "**لو خيروك بين المال أو الذكاء**.",
  "**لو خيروك بين المال أو الصحة**.",
  "**لو خيروك بين الجمال أو الذكاء**.",
  "**لو خيروك بين الذكاء أو الصحة**.",
  "**لو خيروك بين إرسال رسالة صوتية لأمك مدة دقيقة كاملة لا تحتوي إلا على صراخك وخوفك، أو كسر بيضة نيئة على رأسك**."
];

client.on("message", message => {
  if (message.content.startsWith("#Select")) {
    if (!message.channel.guild)
      return message.reply("** This command only for servers**");
    var embed = new Discord.RichEmbed()
      .setColor("RANDOM")

      .setThumbnail(message.author.avatarURL)
      .addField(
        "لعبه لو خيروك",
        `${secre[Math.floor(Math.random() * secre.length)]}`
      );
    message.channel.sendEmbed(embed);
    console.log(" ᶜ" + message.author.username);
  }
});

client.on("guildMemberUpdate", (oldMember, newMember) => {
  if (oldMember.roles.size < newMember.roles.size) {
    let role = newMember.roles.filter(r => !oldMember.roles.has(r.id)).first();
    let hector = new Discord.RichEmbed()
      .setThumbnail(oldMember.guild.iconURL)
      .setColor("BLACK")
      .setDescription(
        `✅ تم اعطائك رتبة \n**الرتبة:**  ${role.name} \n **السيرفر:** ${newMember.guild.name}`
      )
      .setTimestamp();
    newMember.user.send(hector);
  }
});



client.on("message", message => {
  if (message.author.bot) return;
  if (message.content.type === "dm") return;

  var command = message.content.toLowerCase().split(" ")[0];
  var args = message.content.split(" ");

  var userID = args[1];

  if (command == prefix + "unban") {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send("Your Don't Have Permission");
    if (!userID) return message.channel.send("**ID Member**");
    if (isNaN(userID)) return message.reply("**Must be numbers**");
    if (userID.length < 16) return message.reply("**Invalid This Is not id**");
    message.guild.fetchBans().then(bans => {
      var Found = bans.find(m => m.id === userID);
      if (!Found) return message.reply("**This Member Has Not Banned**");
      message.guild.unban(userID);
      message.channel.send(
        `: <@${userID}> **تم فك بند العصو من السيرفر **`
      );
    });
  }
});

client.on("message", message => {
  if (message.content.startsWith("#verfiy")) {
    let num = Math.floor(Math.random() * 4783 + 10);

    message.channel.send(`يرجاء كتابة الرقم التالي: **${num}**`).then(m => {
      message.channel
        .awaitMessages(res => res.content == `${num}`, {
          max: 1,
          time: 60000,
          errors: ["time"]
        })
        .then(collected => {
          message.delete();
          m.delete();
          message.member.addRole(
            message.guild.roles.find(c => c.name == "Members")
          );
        })
        .catch(() => {
          m.edit(
            `You took to long to type the number.\nRe-type the command again if you want to verify yourself.`
          ).then(m2 => m.delete(15000));
        });
    });
  }
});

client.on("message", msg => {
  if (msg.content === "باك") {
    msg.reply("**ولكمـ نورتـ السيرفر **");
  }
});

client.on("message", msg => {
  if (msg.content === "هلا") {
    msg.reply("**هلااا نورت ام السيرفر**");
  }
});

client.on("message", msg => {
  if (msg.content === "السلام عليكم") {
    msg.reply("** وعليكم السلام**");
  }
});



client.on("message", msg => {
  if (msg.content === "سلام عليكم") {
    msg.reply("** وعليكم السلام**");
  }
});

client.on("message", async message => {
  if (!message.channel.guild) return;
  if (message.content.startsWith(prefix + "Minv")) {
    message.author.avatarURL;
    var nul = 0;
    var guild = message.guild;
    await guild.fetchInvites().then(invites => {
      invites.forEach(invite => {
        if (invite.inviter === message.author) {
          nul += invite.uses;
        }
      });
    });
    if (nul > 0) {
      console.log(
        `\n${message.author.tag} has ${nul} invites in ${guild.name}\n`
      );
      var embed = new Discord.RichEmbed()
        .setColor("#000000")
        .addField(`${message.author.username}`, `لقد قمت بدعوة **${nul}** شخص`);
      message.channel.send({ embed: embed });
      return;
    } else {
      var embed = new Discord.RichEmbed()
        .setColor("#000000")
        .addField(
          `${message.author.username}`,
          `لم تقم بدعوة أي شخص لهذة السيرفر`
        );

      message.channel.send({ embed: embed });
      return;
    }
  }
  if (message.content.startsWith(prefix + "invite-codes")) {
    let guild = message.guild;
    var codes = [""];
    message.channel.send(
      ":postbox: **لقد قمت بأرسال جميع روابط الدعوات التي قمت بأنشائها في الخاص**"
    );
    guild
      .fetchInvites()
      .then(invites => {
        invites.forEach(invite => {
          if (invite.inviter === message.author) {
            codes.push(`discord.gg/${invite.code}`);
          }
        });
      })
      .then(m => {
        if (codes.length < 0) {
          var embed = new Discord.RichEmbed()
            .setColor("#000000")
            .addField(
              `Your invite codes in ${message.guild.name}`,
              `You currently don't have any active invites! Please create an invite and start inviting, then you will be able to see your codes here!`
            );
          message.author.send({ embed: embed });
          return;
        } else {
          var embed = new Discord.RichEmbed()
            .setColor("#000000")
            .addField(
              `Your invite codes in ${message.guild.name}`,
              `Invite Codes:\n${codes.join("\n")}`
            );
          message.author.send({ embed: embed });
          return;
        }
      });
  }
});

client.on("message", message => {
  let command = message.content.split(" ")[0];
  if (command == prefix + "moreinfo") {
    var server = client.guilds.find(
      c => c.id === message.content.split(" ")[1]
    );
    if (!server)
      return message.channel.send("**I Can't find this server :x:**");
    message.channel.send(
      new Discord.RichEmbed()
        .setColor("#36393e")
        .setTitle(`📖 **${server.name}** Info`)
        .setImage(
          `https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png?size=1024`
        )
        .addField(
          "**Members Cout:**",
          `**${server.memberCount -
            server.members.filter(m => m.user.bot).size}** | **${
            server.members.filter(m => m.user.bot).size
          }** bots`,
          true
        )
        .addField(
          `**Channels [${server.channels.size}]**`,
          `**${
            server.channels.filter(m => m.type === "text").size
          }** Text | **${
            server.channels.filter(m => m.type === "voice").size
          }** Voice | **${
            server.channels.filter(m => m.type === "category").size
          }** Category`,
          true
        )
        .addField("**Server Region:**", server.region, true)
        .addField("**Server Owner**", `**${server.owner}**`, true)
        .addField(`**Roles Count [${server.roles.size}]**`, `** **`, true)
        .addField(
          `**verification Level [ ${server.verificationLevel} ]**`,
          `** **`,
          true
        )
    );
  }
});
client.on("message", async message => {
  var prefix = "#";
  function timeCon(time) {
    let days = Math.floor((time % 31536000) / 86400);
    let hours = Math.floor(((time % 31536000) % 86400) / 3600);
    let minutes = Math.floor((((time % 31536000) % 86400) % 3600) / 60);
    let seconds = Math.round((((time % 31536000) % 86400) % 3600) % 60);
    days = days > 9 ? days : "0" + days;
    hours = hours > 9 ? hours : "0" + hours;
    minutes = minutes > 9 ? minutes : "0" + minutes;
    seconds = seconds > 9 ? seconds : "0" + seconds;
    return `${days > 0 ? `${days}:` : ""}${
      (hours || days) > 0 ? `${hours}:` : ""
    }${minutes}:${seconds}`;
  }
  if (message.content.startsWith(prefix + "botin")) {
    const millis = new Date().getTime() - client.user.createdAt.getTime();
    const noww = new Date();
    dateFormat(noww, "dddd, mmmm dS, yyyy, h:MM:ss TT");
    const createdAT = millis / 1000 / 60 / 60 / 24;
    var star = new Discord.RichEmbed()
      .setTitle(`${client.user.username} معلومات عن بوت`)
      .setColor("#36393e")
      .addField("💓 امر البوت", prefix, true)
      .addField(
        "🖥️ الرامات المستخدمة",
        `${(process.memoryUsage().rss / 1048576).toFixed()} ميجا بايت`,
        true
      )
      .addField("🏍️ سرعة البوت", `${Math.round(client.ping)} ملي سكند`, true)
      .addField("⏲️ تم تشغيل البوت منذ", `${timeCon(process.uptime())}`, true)
      .addField("💚 السيرفرات", client.guilds.size, true)
      .addField("💙 المستخدمين", client.users.size, true);
    message.channel.send(star);
  }
});

client.on("message", message => {
  if (!message.channel.guild) return;
  if (message.content == "#members")
    var kayan = new Discord.RichEmbed()
      .setThumbnail(message.author.avatarURL)
      .setFooter(message.author.username, message.author.avatarURL)
      .setTitle("| معلومات الأعضاء")
      .addBlankField(true)
      .addField(
        "| متصل بالانترنت",
        `${
          message.guild.members.filter(m => m.presence.status == "online").size
        }`
      )
      .addField(
        "| مشغول",
        `${message.guild.members.filter(m => m.presence.status == "dnd").size}`
      )
      .addField(
        "| وضع الهلال",
        `${message.guild.members.filter(m => m.presence.status == "idle").size}`
      )
      .addField(
        "|غير متصل على الانترنت",
        `${
          message.guild.members.filter(m => m.presence.status == "offline").size
        }`
      )
      .addField(
        "| اعضاء السيرفر",
        `${message.guild.memberCount}`
      );
  message.channel.send(kayan);
});

client.on("message", message => {
  if (message.author.bot) return;
  if (message.isMentioned(client.user)) {
    message.reply(`
__**   
  UltraBot

My Prefix : #

My Deveolper : 『Rome』

Please Join Support Server**__`);
    let ew = new Discord.RichEmbed()
      .setDescription("[Click Here](https://discord.gg/bQNBxfU)")
      .setFooter("Support Server");
    message.channel.send(ew);
  }
});

var replace = require("replace"); //npm i replace

let name = JSON.parse(fs.readFileSync("./name.json", "utf8"));

client.on("message", msg => {
  if (msg.content.startsWith(`#setNickname`)) {
    if (!msg.member.hasPermission("ADMINISTRATOR"))
      return msg.channel.send("❌|**`ADMINISTRATOR`لا توجد لديك رتبة`**");
    let argsN = msg.content.split(" ").slice(1);
    let argsN2 = argsN.join(" ").slice(2);
    if (!argsN[0])
      return msg
        .reply(`${prefix}setNickname <on / off>`)
        .then(z => z.delete(1600));
    if (argsN[0] === "on") {
      if (!argsN2)
        return msg
          .reply(`${prefix}setNickname <on> <new nickname>`)
          .then(z => z.delete(1600));
      msg.guild.members.forEach(r => {
        if (r.user.bot) return;
        if (!name[r.id]) {
          name[r.id] = { name: r.nickname };
        }
        name[r.id].name = r.nickname;
        if (msg.content.includes("{user}")) {
          r.setNickname(argsN2.replace("{user}", name[r.id].name));
        } else {
          r.setNickname(`${argsN2}`);
        }
        nicknameforjoin = r.nickname;
      });
    } else {
      if (argsN[0] === "off") {
        msg.guild.members.forEach(r => {
          if (r.user.bot) return;
          if (!name[r.id]) return;
          r.setNickname(name[r.id].name);
        });
        nicknameforjoin = false;
      } else {
        msg.reply(`${prefix}setNickname <on / off>`).then(z => z.delete(1600));
      }
    }
    fs.writeFile("./name.json", JSON.stringify(name), err => {
      if (err) console.log(err);
    });
  }
});

const rWlc = JSON.parse(fs.readFileSync("./AutoRole.json", "utf8"));
client.on("message", message => {
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  if (!rWlc[message.guild.id])
    rWlc[message.guild.id] = {
      role: "member"
    };
  const channel = rWlc[message.guild.id].role;
  if (message.content.startsWith(prefix + "autorole")) {
    if (!message.member.hasPermission(`MANAGE_GUILD`)) return;
    let newrole = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (!newrole) return message.reply(`**${prefix}autorole <role name>**`);
    rWlc[message.guild.id].role = newrole;
    message.channel.send(
      `**${message.guild.name}'s role has been changed to ${newrole}**`
    );
  }
  fs.writeFile("./AutoRole.json", JSON.stringify(rWlc), function(e) {
    if (e) throw e;
  });
});
client.on("guildMemberAdd", member => {
  if (!rWlc[member.guild.id])
    rWlc[member.guild.id] = {
      role: "member"
    };
  const sRole = rWlc[member.guild.id].role;
  let Rrole = member.guild.roles.find("name", sRole);
  member.addRole(Rrole);
});

let sWlc = JSON.parse(fs.readFileSync("./setWlc.json", "UTF8"))   
client.on('message', message => {
if(message.channel.type === "dm") return;
if(message.author.bot) return;
  if(!sWlc[message.guild.id]) sWlc[message.guild.id] = {
    channel: "welcome"
}
const channel = sWlc[message.guild.id].channel
  if (message.content.startsWith(prefix + "setwelcomer")) {
    if(!message.member.hasPermission(`MANAGE_GUILD`)) return;
    let newChannel = message.content.split(' ').slice(1).join(" ")
    if(!newChannel) return message.reply(`**${prefix}setwelcomer <channel name>**`)
    sWlc[message.guild.id].channel = newChannel
    message.channel.send(`**${message.guild.name}'s channel has been changed to ${newChannel}**`);
  }
   fs.writeFile('./setWlc.json', JSON.stringify(sWlc), (err) => {
if (err) console.error(err);
})
});
client.on("guildMemberAdd", member => {
      if(!sWlc[member.guild.id]) sWlc[member.guild.id] = {
    channel: "welcome"
  }
  const channel = sWlc[member.guild.id].channel
    const sChannel = sWlc[member.guild.id].channel
    let welcomer = member.guild.channels.find('name', sChannel);
    let memberavatar = member.user.avatarURL
      if (!welcomer) return;
      if(welcomer) {
member.guild.fetchInvites().then(guildInvites => {
    const ei = invites[member.guild.id];
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const inviter = client.users.get(invite.inviter.id);
    const yumz = member.guild.channels.find("name", `${sChannel}`);
     yumz.send(`<@${member.user.id}> joined by <@${inviter.id}>`);
   //  yumz.send(`<@${member.user.id}> joined using invite code ${invite.code} from <@${inviter.id}>. Invite was used ${invite.uses} times since its creation.`);
  }); 
      var Canvas = require('canvas')
      var jimp = require('jimp')
      
const w = ['./w1.png'];      
              let Image = Canvas.Image,
                  canvas = new Canvas(400, 200),
                  ctx = canvas.getContext('2d');
  
              fs.readFile(`${w[Math.floor(Math.random() * w.length)]}`, function (err, Background) {
                  if (err) return console.log(err)
                  let BG = Canvas.Image;
                  let ground = new Image;
                  ground.src = Background;
                  ctx.drawImage(ground, 0, 0, 400, 200);
      
      })
      
                      let url = member.user.displayAvatarURL.endsWith(".webp") ? member.user.displayAvatarURL.slice(5, -20) + ".gif" : member.user.displayAvatarURL;
                      jimp.read(url, (err, ava) => {
                          if (err) return console.log(err);
                          ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                              if (err) return console.log(err);
      
                                    ctx.font = "bold 12px Arial";
                              ctx.fontSize = '20px';
                              ctx.fillStyle = "#f1f1f1";
                                ctx.fillText(member.user.username, 200, 150);
                              
                              //NAMEً
                              ctx.font = "bold 12px Arial";
                              ctx.fontSize = '20px';
                              ctx.fillStyle = "#f1f1f1";
      ctx.fillText(`Welcome To Server`, 260, 125);
      
                              //AVATARً
                              let Avatar = Canvas.Image;
                              let ava = new Avatar;
                              ava.src = buf;
                              ctx.beginPath();
                              ctx.arc(77, 101, 62, 0, Math.PI*2);
                              ctx.stroke();
                                 ctx.clip();
                                 ctx.drawImage(ava, 13, 38, 128, 126); 

                            
    welcomer.sendFile(canvas.toBuffer())
      
      
                          
      })
      })
      
      }
      });

client.on("message", async message => {
  let args = message.content.split(" ");
  if (message.content.startsWith(prefix + "inv")) {
    let ew = new Discord.RichEmbed()
      .setDescription(
        "[Click Here](رابط بوتك)"
      )
      .setFooter("Bot Invite");
    message.channel.send(ew);
  }
});


client.on("message", message => {
  // تقديم اداره
  if (message.content.startsWith("#apply")) {
    if (!message.channel.guild) return;
    if (message.author.bot) return;
    let channel = message.guild.channels.find("name", "𝗦ubmits");
    if (!channel)
      return message.reply(
        "****"
      );
    if (channel) {
      message.channel.send(message.member + "`1`").then(m => {
        m.edit(message.member + ", اسمك");
        m.channel
          .awaitMessages(m1 => m1.author == message.author, {
            maxMatches: 1,
            time: 60 * 1000
          })
          .then(m1 => {
            m1 = m1.first();
            var name = m1.content;
            m1.delete();
            m.edit(message.member + "`2`").then(m => {
              m.edit(message.member + ", عمرك");
              setTimeout(() => {
                m.delete();
              }, 2500);
              m.channel
                .awaitMessages(m2 => m2.author == message.author, {
                  maxMatches: 1,
                  time: 60 * 1000
                })
                .then(m2 => {
                  m2 = m2.first();
                  var age = m2.content;
                  m2.delete();
                  message.channel.send(message.member + "`3`").then(m => {
                    m.edit(message.member + " فترة إقامتك");
                    setTimeout(() => {
                      m.delete();
                    }, 2500);
                    m.channel
                      .awaitMessages(m1 => m1.author == message.author, {
                        maxMatches: 1,
                        time: 60 * 1000
                      })
                      .then(m3 => {
                        m3 = m3.first();
                        var ask = m3.content;
                        m3.delete();
                        message.channel.send(message.member + "`4`").then(m => {
                          m.edit(message.member + ",هل تعرف كل القوانين ");
                          setTimeout(() => {
                            m.delete();
                          }, 2500);
                          m.channel
                            .awaitMessages(m1 => m1.author == message.author, {
                              maxMatches: 1,
                              time: 60 * 1000
                            })
                            .then(m4 => {
                              m4 = m4.first();
                              var ask2 = m4.content;
                              m4.delete();
                              message.channel
                                .send(message.member + "``5``")
                                .then(m => {
                                  m.edit(message.member + ", مدة تفاعلك");
                                  m.channel
                                    .awaitMessages(
                                      m1 => m1.author == message.author,
                                      { maxMatches: 1, time: 60 * 1000 }
                                    )
                                    .then(m5 => {
                                      m5 = m5.first();
                                      var ask3 = m5.content;
                                      m5.delete();
                                      m.edit(
                                        message.member + "<a:overify:688707812225712152> تم ارسال المعلومات "
                                      ).then(mtime => {
                                        setTimeout(() => {
                                          let embed = new Discord.RichEmbed()
                                            .setAuthor(
                                              message.author.username,
                                              message.author.avatarURL
                                            )
                                            .setColor("#c3cdff")
                                            .setTitle(
                                              `\ <a:overify:688707812225712152> \n > ID: ${message.author.id}`
                                            )
                                            .addField(
                                              " الاسم:",
                                              ` ** ${name} ** `,
                                              true
                                            )
                                            .addField(
                                              " العمر",
                                              ` ** ${age} ** `,
                                              true
                                            )
                                            .addField(
                                              " فترة إقامتك Discord",
                                              `** ${ask} ** `,
                                              true
                                            )
                                            .addField(
                                              " هل تعرف كل القوانين ؟ ",
                                              ` ** ${ask2} ** `,
                                              true
                                            )
                                            .addField(
                                              " مدة تفاعلك",
                                              ` ** ${ask3} ** `,
                                              true
                                            )
                                            .addField(
                                              "> __تم صنع الحساب:__",
                                              ` ${message.author.createdAt}  `,
                                              true
                                            );
                                          channel.send(embed);
                                        }, 2500);
                                        setTimeout(() => {
                                          mtime.delete();
                                        }, 3000);
                                      });
                                    });
                                });
                            });
                        });
                      });
                  });
                });
            });
          });
      });
    }
  }
});
client.on("message", async message => {
  let mention = message.mentions.members.first();
  if (message.content.startsWith("#قبول")) {
    if (!message.channel.guild) return;
    let acRoom = message.guild.channels.find("name", "𝗦ubmit-apply");
    if (!message.guild.member(message.author).hasPermission("ADMINISTRATOR"))
      return;
    if (!mention) return message.reply("Please Mention");

    acRoom.send(
      `تم قبولك و اعطائك رتبة ${mention}`
    );
  }
});

client.on("message", async message => {
  let mention = message.mentions.members.first();
  if (message.content.startsWith("#رفض")) {
    if (!message.channel.guild) return;
    let acRoom = message.guild.channels.find("name", "𝗦ubmit-apply");
    if (!message.guild.member(message.author).hasPermission("ADMINISTRATOR"))
      return;
    if (!mention) return message.reply("Please Mention");

    acRoom.send(
      `للأسف تم رفضك \n ${mention} - :pleading_face: `
    );
  }
});

client.on("message", async msg => {
  if (msg.author.bot) return undefined;
  if (!msg.content.startsWith(prefix)) return undefined;
  const args = msg.content.split(" ");
  const searchString = args.slice(1).join(" ");
  const url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";
  const serverQueue = queue.get(msg.guild.id);
  let command = msg.content.toLowerCase().split(" ")[0];
  command = command.slice(prefix.length);
  if (command === `play`) {
    const voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel) return msg.channel.send("**يجب ان تكون بروم صوتي**");
    const permissions = voiceChannel.permissionsFor(msg.client.user);
    if (!permissions.has("CONNECT")) {
      return msg.channel.send("**ما عندي صلاحيات للدخول في هاد الرروم**");
    }
    if (!permissions.has("SPEAK")) {
      return msg.channel.send("**ما عندي صلاحيات للتكلم في هاد الرروم**");
    }

    if (!permissions.has("EMBED_LINKS")) {
      return msg.channel.sendMessage("**`EMBED LINKS يجب ان اتوفر برمشن **");
    }

    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      const playlist = await youtube.getPlaylist(url);
      const videos = await playlist.getVideos();

      for (const video of Object.values(videos)) {
        const video2 = await youtube.getVideoByID(video.id);
        await handleVideo(video2, msg, voiceChannel, true);
      }
      return msg.channel.send(
        ` **${playlist.title}**** <a:overify:688707812225712152>تم الضافة الي قائمة التشغبل**`
      );
    } else {
      try {
        var video = await youtube.getVideo(url);
      } catch (error) {
        try {
          var videos = await youtube.searchVideos(searchString, 5);
          let index = 0;
          const embed1 = new Discord.RichEmbed()
            .setDescription(
              `**الرجاء اختيار رقم المقطع** :
${videos.map(video2 => `[**${++index} **] \`${video2.title}\``).join("\n")}`
            )

            .setFooter("UltraBot");
          msg.channel.sendEmbed(embed1).then(message => {
            message.delete(20000);
          });

          try {
            var response = await msg.channel.awaitMessages(
              msg2 => msg2.content > 0 && msg2.content < 11,
              {
                maxMatches: 1,
                time: 15000,
                errors: ["time"]
              }
            );
          } catch (err) {
            console.error(err);
            return msg.channel.send("**لم يتم إختيآر اي مقطع صوتي**");
          }
          const videoIndex = parseInt(response.first().content);
          var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
        } catch (err) {
          console.error(err);
          return msg.channel.send("**:X: لا يتوفر نتآئج بحث** ");
        }
      }

      return handleVideo(video, msg, voiceChannel);
    }
  } else if (command === `skip`) {
    if (!msg.member.voiceChannel)
      return msg.channel.send("**أنت لست بروم صوتي **.");
    if (!serverQueue) return msg.channel.send("**مافي اي مقطع لتجاوزه**");
    serverQueue.connection.dispatcher.end("تم تجاوز المقطع<a:overify:688707812225712152>");
    return undefined;
  } else if (command === `stop`) {
    if (!msg.member.voiceChannel)
      return msg.channel.send("أنت لست بروم صوتي .");
    if (!serverQueue) return msg.channel.send("**لمافي اي مقطع لايقافه**");
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end("تم إيقاف المقطع<a:overify:688707812225712152>");
    return undefined;
  } else if (command === `vol`) {
    if (!msg.member.voiceChannel)
      return msg.channel.send("**أنت لست بروم صوتي **.");
    if (!serverQueue) return msg.channel.send("**لا يوجد شيء شغآل.**");
    if (!args[1])
      return msg.channel.send(
        `:loud_sound: **مستوى الصوت** **${serverQueue.volume}**`
      );
    serverQueue.volume = args[1];
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 50);
    return msg.channel.send(`:speaker: <a:overify:688707812225712152>تم تغير الصوت الي **${args[1]}**`);
  } else if (command === `np`) {
    if (!serverQueue) return msg.channel.send("**لا يوجد شيء حالي فالعمل.**");
    const embedNP = new Discord.RichEmbed().setDescription(
      `:notes: الان يتم تشغيل : **${serverQueue.songs[0].title}**`
    );
    return msg.channel.sendEmbed(embedNP);
  } else if (command === `queue`) {
    if (!serverQueue) return msg.channel.send("**لا يوجد شيء حالي فالعمل**.");
    let index = 0;

    const embedqu = new Discord.RichEmbed().setDescription(`**Songs Queue**
${serverQueue.songs.map(song => `**${++index} -** ${song.title}`).join("\n")}
**الان يتم تشغيل** ${serverQueue.songs[0].title}`);
    return msg.channel.sendEmbed(embedqu);
  } else if (command === `pause`) {
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause();
      return msg.channel.send("**تم إيقاف الموسيقى مؤقت<a:overify:688707812225712152>ا**!");
    }
    return msg.channel.send("**لا يوجد شيء حالي ف العمل.**");
  } else if (command === "resume") {
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      return msg.channel.send("**استأنفت الموسيقى بالنسبة لك !**");
    }
    return msg.channel.send("**لا يوجد شيء حالي في العمل.**");
  }

  return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
  const serverQueue = queue.get(msg.guild.id);
  console.log(video);

  //	console.log('yao: ' + Util.escapeMarkdown(video.thumbnailUrl));
  const song = {
    id: video.id,
    title: Util.escapeMarkdown(video.title),
    url: `https://www.youtube.com/watch?v=${video.id}`
  };
  if (!serverQueue) {
    const queueConstruct = {
      textChannel: msg.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };
    queue.set(msg.guild.id, queueConstruct);

    queueConstruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      play(msg.guild, queueConstruct.songs[0]);
    } catch (error) {
      console.error(`I could not join the voice channel: ${error}`);
      queue.delete(msg.guild.id);
      return msg.channel.send(`**لا أستطيع دخول هذآ الروم **${error}`);
    }
  } else {
    serverQueue.songs.push(song);
    console.log(serverQueue.songs);
    if (playlist) return undefined;
    else
      return msg.channel.send(
        ` **${song.title}****<a:overify:688707812225712152> تم اضافه الاغنية الي القائمة!**`
      );
  }
  return undefined;
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }
  console.log(serverQueue.songs);

  const dispatcher = serverQueue.connection
    .playStream(ytdl(song.url))
    .on("end", reason => {
      if (reason === "Stream is not generating quickly enough.")
        console.log("Song ended.");
      else console.log(reason);
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

  serverQueue.textChannel.send(`بدء تشغيل : **${song.title}**`);
}
const adminprefix = "#";
client.on("message", message => {
  var argresult = message.content
    .split(` `)
    .slice(1)
    .join(" ");
  if (!devs.includes(message.author.id)) return;

  if (message.content.startsWith(adminprefix + "setname")) {
    client.user.setUsername(argresult).then;
    message.channel.sendMessage(`**${argresult}** :<a:overify:688707812225712152> تم تغيير أسم البوت إلى`);
    return message.reply(
      "**لا يمكنك تغيير الاسم يجب عليك الانتظآر لمدة ساعتين . **"
    );
  } else if (message.content.startsWith(adminprefix + "setavatar")) {
    client.user.setAvatar(argresult);
    message.channel.sendMessage(`**${argresult}** : <a:overify:688707812225712152>تم تغير صورة البوت`);
  }
});

const Canvas = require("canvas");
const credits = JSON.parse(fs.readFileSync("./credits.json"));
var time = require("./time.json");
client.on("message", async message => {
  if (message.author.bot || message.channel.type === "dm") return;
  let args = message.content.split(" ");
  let author = message.author.id;
  if (!credits[author])
    credits[author] = {
      credits: 0
    };
  fs.writeFileSync("./credits.json", JSON.stringify(credits, null, 4));
  if (
    args[0].toLowerCase() == `${prefix}credits` ||
    args[0].toLowerCase() === `${prefix}credit` ||
    args[0].toLowerCase() === `c`
  ) {
    const mention = message.mentions.users.first() || message.author;
    const mentionn = message.mentions.users.first();
    if (!args[2]) {
      message.channel.send(
        `**:bank: | ${mention.username}, Your :credit_card: balance is \`$${credits[mention.id].credits}\`**`
      );
    } else if (mentionn && args[2]) {
      if (isNaN(args[2]))
        return message.channel.send(
          `** :interrobang: | ${message.author.username}, i can't find it!**`
        );
      if (args[2] < 1)
        return message.channel.send(
          `** :interrobang: | ${message.author.username}, type the credit you need to transfer!**`
        );
      if (mention.bot)
        return message.channel.send(
          `**:thinking: | ${message.author.username}, bots do not have credits**`
        );
      if (mentionn.id === message.author.id)
        return message.channel.send(
          `**:interrobang: | ${message.author.username}, I can't find User **`
        );
      if (args[2] > credits[author].credits)
        return message.channel.send(
          `**:thinking: | ${message.author.username}, Your balance is not enough for that!**`
        );
      if (args[2].includes("-"))
        return message.channel.send(
          `**:interrobang: | ${message.author.username}, type the credit you need to transfer!**`
        );
      //let resulting = Math.floor(args[2] - args[2] * (5 / 100));
      let tax = Math.floor(args[2] * (5 / 100));
      let first = Math.floor(Math.random() * 10);
      let second = Math.floor(Math.random() * 10);
      let third = Math.floor(Math.random() * 10);
      let fourth = Math.floor(Math.random() * 10);
      let num = `${first}${second}${third}${fourth}`;
      let canvas = Canvas.createCanvas(100, 50);
      let ctx = canvas.getContext("2d");
      //let tax = message.content.split(" ")[1]
      let Price = message.content.split(" ")[2];
      //tax = tax.replace(/%5/g,"");
      let resulting = Math.floor(Price - Price * (5 / 100));
      const background = await Canvas.loadImage(
        "https://cdn.discordapp.com/attachments/365219235288317962/656362038884565014/captcha.png"
      );
      ctx.drawImage(background, 6, 3, canvas.width, canvas.height);
      ctx.font = "25px Tahoma";
      ctx.fontSize = "7px";
      ctx.fillStyle = "Yellow";
      message.delete();
      //let resulting = Math.floor(Price-(Price*(5/100)));
      message.channel
        .send(
          `**${message.author.username}, Transfer Fees \`${tax}\`, Amount :\`${resulting}\` **
   type these numbers to confirm : `
        )
        .then(m => {
          ctx.fillText(num, canvas.width / 4.8, canvas.height / 1.5);
          message.channel.sendFile(canvas.toBuffer()).then(s => {
            message.channel
              .awaitMessages(r => r.author.id === message.author.id, {
                max: 1,
                time: 20000,
                errors: ["time"]
              })

              .then(collected => {
                if (collected.first().content === num) {
                  message.channel.send(
                    `**:moneybag: | ${message.author.username}, has transferred \`$${resulting}\` to ${mentionn}**`
                  );
                  m.delete();
                  s.delete();
                  mention.send(
                    `**:atm: | Transfer Receipt**\`\`\`You Have Received \$${resulting}\ From User ${message.author.username}; (ID ${message.author.id})\`\`\``
                  );
                  m.delete();
                  s.delete();

                  credits[author].credits += Math.floor(-resulting);
                  credits[mentionn.id].credits += Math.floor(+resulting);
                  fs.writeFileSync(
                    "./credits.json",
                    JSON.stringify(credits, null, 4)
                  );
                } else {
                  m.delete();
                }
              });
          });
        });
    }
  }

  if (
    args[0].toLowerCase() === `${prefix}daily` ||
    args[0].toLowerCase() === `d`
  ) {
    let cooldown = 8.64e7;
    let Daily = time[message.author.id];
    if (Daily !== null && cooldown - (Date.now() - Daily) > 0) {
      let times = cooldown - (Date.now() - Daily);
      message.channel.send(
        `**:rolling_eyes: | ${
          message.author.username
        }, your daily credits refreshes in \'${pretty(times, {
          verbose: true
        })}'.\**`
      );
      fs.writeFile("./time.json", JSON.stringify(time), function(e) {
        if (e) throw e;
      });
    } else {
      let ammount = (300, 500, 100, 200, 120, 150, 350, 320, 220, 250);
      credits[author].credits += ammount;
      time[message.author.id] = Date.now();
      message.channel.send(
        `**:moneybag: ${message.author.username}, You got :dollar: ${ammount} daily credits!**`
      );
      fs.writeFile("./credits.json", JSON.stringify(credits), function(e) {
        if (e) throw e;
      });
    }
  }
});

client.on("message", message => {
  if (message.content.includes("discord.gg")) {
    if (!message.channel.guild)
      return message.reply("** advertising me on DM ? 🤔   **");
    if (!message.member.hasPermissions(["ADMINISTRATOR"])) {
      message.delete();
      return message.reply(`** ممنوع نشر الروابط :angry: ! **`);
    }
  }
});

//محتاج ملف بي اسم
//top.json
// وا حط داخله {}

const top = JSON.parse(fs.readFileSync("top.json", "UTF8"));

function save() {
  fs.writeFileSync("./top.json", JSON.stringify(top, null, 4));
}
client.on("voiceStateUpdate", async function(oldMember, newMember) {
  if (newMember.user.bot) return;
  if (!top[newMember.guild.id]) top[newMember.guild.id] = {};
  if (!top[newMember.guild.id][newMember.user.id])
    top[newMember.guild.id][newMember.user.id] = {
      text: 0,
      voice: parseInt(Math.random() * 10),
      msgs: 0,
      id: newMember.user.id
    };
  save();
  if (!oldMember.voiceChannel && newMember.voiceChannel) {
    var addXP = setInterval(async function() {
      top[newMember.guild.id][newMember.user.id].voice += parseInt(
        Math.random() * 4
      );
      save();
      if (!newMember.voiceChannel) {
        clearInterval(addXP);
      }
    }, 60000);
  }
});
client.on("message", async function(message) {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!top[message.guild.id]) top[message.guild.id] = {};
  if (!top[message.guild.id][message.author.id])
    top[message.guild.id][message.author.id] = {
      text: parseInt(Math.random() * 10),
      voice: 1,
      msgs: 0,
      id: message.author.id
    };
  if (top[message.guild.id][message.author.id].msgs > 10) {
    top[message.guild.id][message.author.id].text += parseInt(
      Math.random() * 4
    );
    top[message.guild.id][message.author.id].msgs = 0;
  }
  save();
  var args = message.content.split(" ");
  var cmd = args[0].toLowerCase();
  if (!message.content.startsWith(prefix)) return;
  if (message.content.startsWith(prefix + "top text")) {
    var topArray = Object.values(top[message.guild.id]);
    var num = 0;
    var textStr = `${topArray
      .sort((a, b) => b.text - a.text)
      .slice(0, 10)
      .filter(user => user.text > 0 && message.guild.members.get(user.id))
      .map(function(user) {
        if (user.text > 0) {
          return `**#${++num} |                           <@${
            user.id
          }> XP:                           ${user.text} **`;
        }
      })
      .join("n")}`;
    var embed = new Discord.RichEmbed()
      .setAuthor("📋 | Guild Score Leaderboards", message.guild.iconURL)
      .setColor("13B813")
      .addField(
        `**:speech_balloon: | TEXT LEADERBOARD**`,
        `${textStr}   \n\n **✨ | For More: ${prefix}top text**`,
        true
      )
      .setFooter(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp();
    message.channel.send({
      embed: embed
    });
  } else {
    if (message.content.startsWith(prefix + "top voice")) {
      var topArray = Object.values(top[message.guild.id]);
      var num = 0;
      var voiceStr = `${topArray
        .sort((a, b) => b.voice - a.voice)
        .slice(0, 10)
        .filter(user => user.voice > 0 && message.guild.members.get(user.id))
        .map(function(user) {
          if (user.voice > 0) {
            return `**#${++num} |                                   <@${
              user.id
            }> XP:                     ${user.voice}**`;
          }
        })
        .join("n")}`;
      var embed = new Discord.RichEmbed()
        .setAuthor("📋 | Guild Score Leaderboards", message.guild.iconURL)
        .setColor("13B813")
        .addField(
          `**:microphone2: | VOICE LEADERBOARD**`,
          `${voiceStr}   \n\n **:sparkles: More?** ${prefix}top voice`,
          true
        )

        .setFooter(message.author.tag, message.author.displayAvatarURL)
        .setTimestamp();
      message.channel.send({
        embed: embed
      });
    } else {
      if (message.content.startsWith(prefix + "top")) {
        var topArray = Object.values(top[message.guild.id]);
        var num = 0;
        var textStr = `              ${topArray
          .sort((a, b) => b.text - a.text)
          .slice(0, 5)
          .filter(user => user.text > 0 && message.guild.members.get(user.id))
          .map(function(user) {
            if (user.text > 0) {
              return `**#${++num} |                   <@${
                user.id
              }> XP:                  ${user.text} **`;
            }
          })
          .join("n")}`;
        num = 0;
        var voiceStr = `${topArray
          .sort((a, b) => b.voice - a.voice)
          .slice(0, 5)
          .filter(user => user.voice > 0 && message.guild.members.get(user.id))
          .map(function(user) {
            if (user.voice > 0) {
              return `**#${++num} |               <@${
                user.id
              }> XP:                        ${user.voice} **`;
            }
          })
          .join("n")}`;
        var embed = new Discord.RichEmbed()
          .setAuthor("📋 | Guild Score Leaderboards", message.guild.iconURL)
          .addField(
            "**TOP 5 TEXT :speech_balloon:**",
            `${textStr}
  nn  **:sparkles: More?** ${prefix}top text`,
            true
          )
          .addField(
            "**TOP 5 VOICE :microphone2:**",
            `${voiceStr} 
nn **:sparkles: More?** ${prefix}top voice`,
            true
          )
          .setFooter(message.author.tag, message.author.displayAvatarURL)
          .setTimestamp()
          .setColor("13B813");
        message.channel.send({
          embed: embed
        });
      }
    }
  }
});

let warns = JSON.parse(fs.readFileSync("./warnings.json"));

client.on("message", async message => {
  if (message.author.x5bz) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "warn") {
    if (!message.channel.guild)
      return message.reply("** This command only for servers**");

    if (!message.guild.member(message.author).hasPermission("BAN_MEMBERS"))
      return message.reply("**You Don't Have ` BAN_MEMBERS ` Permission**");
    let user = message.mentions.users.first();
    let reason = message.content
      .split(" ")
      .slice(2)
      .join(" ");

    if (message.mentions.users.size < 1)
      return message.reply("**Type The Resone**");
    if (!reason) return message.reply("**Type The Resone**");

    if (!warns[user.id])
      warns[user.id] = {
        warns: 0
      };

    warns[user.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), err => {
      if (err) console.log(err);
    });

    const warnembed = new Discord.RichEmbed()
      .setAuthor(`WARNED!`, user.displayAvatarURL)
      .setColor("RANDOM")
      .setTimestamp()
      .addField("**User:**", "**[ " + `${user.tag}` + " ]**")
      .addField("**By:**", "**[ " + `${message.author.tag}` + " ]**")
      .addField("**Reason:**", "**[ " + `${reason}` + " ]**");
    client.channels.find("name", "log").send({
      embed: warnembed
    });

    if (warns[user.id].warns == 2) {
      //??? ???????? ??????
      let muterole = message.guild.roles.find(`name`, "Muted");
      if (!muterole) {
        try {
          muterole = await message.guild.createRole({
            name: "Muted",
            color: "#000000",
            permissions: []
          });
          message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(muterole, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false
            });
          });
        } catch (e) {
          console.log(e.stack);
        }
      }

      let tomute = message.guild.member(
        message.mentions.users.first() || message.guild.members.get(args[0])
      );
      if (!tomute)
        return message
          .reply("**??? ???? ?????? ?????**:x: ")
          .then(m => m.delete(5000));

      let mutetime = "60s";
      await tomute.addRole(muterole.id);
      message.channel.send(
        `<@${user.id}> has been temporarily muted<a:overify:688707812225712152>s`
      );

      setTimeout(async function() {
        await tomute.removeRole(muterole.id);
        message.reply(
          `<@${user.id}> has been unmuted<a:overify:688707812225712152>.`
        );
      }, ms(mutetime));
    }
    if (warns[user.id].warns == 3) {
      //??? ???????? ??????
      message.guild.member(user).ban(reason);
      message.reply(
        `<@${user.id}> has been banned <a:overify:688707812225712152>.`
      );
    }
  }
});

  client.on("message", msg => {
    var prefix = "#";
if(msg.content.startsWith (prefix + "id")) {  // Alpha Codes Ghost
if(!msg.channel.guild) return msg.reply('**:x: اسف لكن هذا الامر للسيرفرات فقط **');         
const embed = new Discord.RichEmbed();
embed.addField(":cloud_tornado:  الاسم", `**[ ${msg.author.username}#${msg.author.discriminator} ]**`, true)
   .addField(":id:  الايدي", `**[ ${msg.author.id} ]**`, true)
   .setColor("RANDOM")
   .setFooter(msg.author.username , msg.author.avatarURL)
   .setThumbnail(`${msg.author.avatarURL}`)  // Alpha Codes Ghost
   .setTimestamp()
   .setURL(`${msg.author.avatarURL}`)
   .addField(':spy:  الحالة', `**[ ${msg.author.presence.status.toUpperCase()} ]**`, true)
   .addField(':satellite_orbital:   Playing', `**[ ${msg.author.presence.game === null ? "No Game" : msg.author.presence.game.name} ]**`, true)
   .addField(':military_medal:  الرتب', `**[ ${msg.member.roles.filter(r => r.name).size} ]**`, true)
msg.channel.send({embed: embed})
}
});
  

const profile = JSON.parse(fs.readFileSync("profile.json", "utf8"));

client.on("message", message => {
  if (!profile[message.author.id])
    profile[message.author.id] = {
      points: 0,
      level: 1,
      rep: 0,
      tite: "No Title"
    };
  if (message.author.bot) return;
  profile[message.author.id].points = Math.floor(
    profile[message.author.id].points + 1
  );
  if (profile[message.author.id].points > 250) {
    profile[message.author.id].points = 0;
    profile[message.author.id].level = Math.floor(
      profile[message.author.id].level + 1
    );
    message.channel.send(
      `**${message.author.username}, You leveld up to __${profile[message.author.id].level}__**`
    );
  }
  fs.writeFile("profile.json", JSON.stringify(profile), err => {
    if (err) console.error(err);
  });
});

client.on("message", message => {
  let tit = message.content
    .split(" ")
    .slice(1)
    .join(" ");
  if (message.content.startsWith(prefix + "title")) {
    if (!profile[message.author.id].tite)
      profile[message.author.id].tite = "Hey im using Super";
    if (!tit) {
      message.channel.send("**Usage: <title <something>**");
    } else {
      profile[message.author.id].tite = tit;
      message.channel.send(`:ok:`);
    }
  }
  fs.writeFile("profile.json", JSON.stringify(profile), err => {
    if (err) console.error(err);
  });
});

client.on("message", message => {
  if (message.content.startsWith(prefix + "rep")) {
    if (!message.channel.guild) return;
    moment.locale("en");
    var getvalueof = message.mentions.users.first();
    if (!getvalueof)
      return message.channel.send(
        `**:mag: |  ${message.author.username}, the user could not be found.    **`
      );
    if (getvalueof.id == message.author.id)
      return message.channel.send(
        `**${message.author.username}, you cant give yourself a reputation !**`
      );
    if (profile[message.author.id].reps != moment().format("L")) {
      profile[message.author.id].reps = moment().format("L");
      profile[getvalueof.id].rep = Math.floor(profile[getvalueof.id].rep + 1);
      message.channel.send(
        `** :up:  |  ${message.author.username} has given ${getvalueof} a reputation point!**`
      );
    } else {
      message.channel.send(
        `**:stopwatch: |  ${
          message.author.username
        }, you can raward more reputation  ${moment()
          .endOf("day")
          .fromNow()} **`
      );
    }
  }
  fs.writeFile("profile.json", JSON.stringify(profile), err => {
    if (err) console.error(err);
  });
});

client.on("message", message => {
  if (message.author.bot) return;
  if (!message.channel.guild) return;
  if (message.content.startsWith("#Profile")) {
    let user = message.mentions.users.first();
    var men = message.mentions.users.first();
    var heg;
    if (men) {
      heg = men;
    } else {
      heg = message.author;
    }
    var mentionned = message.mentions.members.first();
    var h;
    if (mentionned) {
      h = mentionned;
    } else {
      h = message.member;
    }
    var ment = message.mentions.users.first();
    var getvalueof;
    if (ment) {
      getvalueof = ment;
    } else {
      getvalueof = message.author;
    }
    var mentionned = message.mentions.users.first();
    let mention = message.mentions.users.first() || message.author;

    var client;
    if (mentionned) {
      var client = mentionned;
    } else {
      var client = message.author;
    }
    if (!profile[getvalueof.id])
      profile[getvalueof.id] = {
        points: 0,
        reps: "No Reps",
        credits: 1,
        level: 1,
        tite: "Earth Bot User",
        rep: 0,
        lastDaily: "NOT COLLECTED"
      };
    let Image = Canvas.Image,
      canvas = new Canvas.createCanvas(300, 300),
      ctx = canvas.getContext("2d");
    fs.readFile("Pic.jpg", function(err, Background) {
      //امتداد الصورة
      if (err) return console.log(err);
      let BG = Canvas.Image;
      let ground = new Image();
      ground.src = Background;
      ctx.drawImage(ground, 0, 0, 300, 300); // حجم الصورة
    });
    let url = getvalueof.displayAvatarURL.endsWith(".webp")
      ? getvalueof.displayAvatarURL.slice(5, -20) + ".png"
      : getvalueof.displayAvatarURL;
    jimp.read(url, (err, ava) => {
      if (err) return console.log(err);
      ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
        if (err) return console.log(err);

        //ur name
        ctx.font = "bold 16px kathen"; // حجم الخط و نوعه
        ctx.fontSize = "40px"; // عرض الخط
        ctx.fillStyle = "#000000"; // لون الخط
        ctx.textAlign = "center"; // محاذا ة النص
        ctx.fillText(`${getvalueof.username}`, 153, 104); // احداثيات اسمك

        //ur name
        ctx.font = "bold 16px kathen"; // حجم الخط و نوعه
        ctx.fontSize = "40px"; // عرض الخط
        ctx.fillStyle = "#f1f1f1"; // لون الخط
        ctx.textAlign = "center"; // محاذا ة النص
        ctx.fillText(`${getvalueof.username}`, 151, 102); // احداثيات اسمك

        //credit
        ctx.font = "bold 10px kathen"; // نوع الخط وحجمه
        ctx.fontSize = "10px"; // عرض الخط
        ctx.fillStyle = "#f1f1f1"; // لون الخط
        ctx.textAlign = "center"; // محاذا ة النص
        ctx.fillText(`$${credits[mention.id].credits}`, 230, 182); // احداثيات المصاري

        ctx.font = "bold 14px kathen"; // نوع الخط وحجمه
        ctx.fontSize = "12px"; // عرض الخط
        ctx.fillStyle = "#f1f1f1"; // لون الخط
        ctx.textAlign = "center"; // محاذا ة النص
        ctx.fillText(`${profile[mention.id].tite}`, 150, 130); // احداثيات المصاري

        //Level
        ctx.font = "bold 24px kathen"; // نوع الخط و حجمه
        ctx.fontSize = "10px"; // عرض الخط
        ctx.fillStyle = "#f1f1f1"; // لون الخط
        ctx.textAlign = "center"; // محاذا ة النص
        ctx.fillText(`${profile[getvalueof.id].level}`, 70, 78); // احداثيات اللفل

        //info
        ctx.font = "bold 12px kathen"; // ن
        ctx.fontSize = "15px"; // عرض الخطوع الخط وحجمه
        ctx.fillStyle = "#000000"; // لون الخط
        ctx.textAlign = "center"; // محاذا ة النص
        ctx.fillText(`${profile[getvalueof.id].points}/250`, 150, 232); // احداثيات النقاط

        //info
        ctx.font = "bold 12px kathen"; // ن
        ctx.fontSize = "15px"; // عرض الخطوع الخط وحجمه
        ctx.fillStyle = "#f1f1f1"; // لون الخط
        ctx.textAlign = "center"; // محاذا ة النص
        ctx.fillText(`${profile[getvalueof.id].points}/250`, 150, 232); // احداثيات النقاط

        // REP
        ctx.font = "bold 20px  kathen";
        ctx.fontSize = "50px";
        ctx.fillStyle = "#f1f1f1";
        ctx.textAlign = "center";
        ctx.fillText(`+${profile[mention.id].rep}`, 225, 76);

        let Avatar = Canvas.Image;
        let ava = new Avatar();

        ava.src = buf;
        ctx.beginPath();
        ctx.arc(75, 100, 780, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(ava, 110, 29, 82, 60);

        message.channel.startTyping();
        message.channel.sendFile(canvas.toBuffer());
        message.channel.stopTyping();
      });
    });
  }
});

client.on("guildMemberAdd", member => {
  member
    .createDM()
    .then(function(channel) {
      return channel.send(`ولكم منور امم السيرفر 
ممكن ممكن تدخل .؟
https://discord.gg/7bgdWgg`);
    })
    .catch(console.error);
});

client.on("guildMemberRemove", member => {
  member
    .createDM()
    .then(function(channel) {
      return channel.send(`اخر كلمة .؟ اذا دخلت كفو والله
https://discord.gg/7bgdWgg`);
    })
    .catch(console.error);
});

client.on("message", message => {
  var ms = require("ms");

  var moment = require("moment");

  if (message.author.bot) return;

  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];

  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  let messageArray = message.content.split(" ");

  let embed = new Discord.RichEmbed().setTitle("Examples:")
    .setDescription(`${prefix}grole @metion 1h Founder
${prefix}role @metion 1d Owner
${prefix}role @metion 1w Support
`);
  if (command == "role") {
    if (!message.channel.guild)
      return message.reply("** This command only for servers**");

    if (!message.guild.member(message.author).hasPermission("MANAGE_ROLES"))
      return message.reply(
        "**:x: You Don't Have ` MANAGE_ROLES ` Permission**"
      );

    if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES"))
      return message.reply("**:x: I Don't Have ` MANAGE_ROLES ` Permission**");

    let user = message.mentions.users.first();

    let role = message.content
      .split(" ")
      .slice(3)
      .join(" ");

    var role1 = message.guild.roles
      .filter(r => r.name.toLowerCase().indexOf(role) > -1)
      .first();

    if (!role)
      return message.channel.send(" **Please Type The Role Name First **");

    if (!role1) return message.channel.send("** I can't find this role**");

    let time = messageArray[2];

    if (message.mentions.users.size < 1)
      return message.channel.sendEmbed(embed);

    if (!time.match(/[1-60][s,m,h,d,w]/g))
      return message.channel.send(":x: This Time Is Incorrect");

    if (time && role && user) {
      message.guild.member(user).addRole(role1);

      setTimeout(() => {
        message.guild.member(user).removeRole(role1.id);
        message.channel.send(
          `**I Removed Role From ${user.tag} Because Time is over**`
        );
      }, ms(time));
    }

    let embed = new Discord.RichEmbed()
      .setColor("BLACK")
      .addField("By :", `${message.author.username}`, true)
      .addField("User :", `${user.tag} `, true)
      .addField("Time :", `${ms(ms(time))}`, true)
      .addField("Role :", `${role1.name}`, true);

    message.channel.send(embed);
  }
});

client.on("message", async message => {
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  if (message.author.id != "684762350938488833") return;
  if (message.author.bot) return;
  if (command == "leave") {
    if (!args[0] || args[1])
      return message.reply(`**${prefix}leave <guild_id>**`);
    let GuildId = client.guilds.get(args[0]);
    if (!GuildId) return message.reply(`** Guild ID is not Detected**`);
    GuildId.leave().then(m =>
      message.channel.send("**I have Left " + GuildId.name + " ✅**")
    );
  }
});

client.on("message", message => {
  var args = message.content.split(/[ ]+/);
  if (message.content.includes("كلب")) {
    message.delete();
    message.channel
      .sendMessage("", {
        embed: {
          title: "لا تسب",
          color: 0x06df00,
          description:
            "مَّا يَلْفِظُ مِن قَوْلٍ إِلَّا لَدَيْهِ رَقِيبٌ عَتِيدٌ ",
          footer: {
            text: "By Dark"
          }
        }
      })
      .then(msg => {
        msg.delete(3000);
      });
  }
});

client.on("message", message => {
  var args = message.content.split(/[ ]+/);
  if (message.content.includes("خنيث")) {
    message.delete();
    message.channel
      .sendMessage("", {
        embed: {
          title: "لا تلعن",
          color: 0x06df00,
          description:
            "مَّا يَلْفِظُ مِن قَوْلٍ إِلَّا لَدَيْهِ رَقِيبٌ عَتِيدٌ ",
          footer: {
            text: "By Dark"
          }
        }
      })
      .then(msg => {
        msg.delete(3000);
      });
  }
});

client.on("message", message => {
  var args = message.content.split(/[ ]+/);
  if (message.content.includes("يلعنك")) {
    message.delete();
    message.channel
      .sendMessage("", {
        embed: {
          title: "لا تلعن",
          color: 0x06df00,
          description:
            "مَّا يَلْفِظُ مِن قَوْلٍ إِلَّا لَدَيْهِ رَقِيبٌ عَتِيدٌ ",
          footer: {
            text: "By Dark"
          }
        }
      })
      .then(msg => {
        msg.delete(3000);
      });
  }
});

client.on("message", message => {
  var args = message.content.split(/[ ]+/);
  if (message.content.includes("حمار")) {
    message.delete();
    message.channel
      .sendMessage("", {
        embed: {
          title: "لا تسب",
          color: 0x06df00,
          description:
            "مَّا يَلْفِظُ مِن قَوْلٍ إِلَّا لَدَيْهِ رَقِيبٌ عَتِيدٌ ",
          text: "By Dark",
          footer: {}
        }
      })
      .then(msg => {
        msg.delete(3000);
      });
  }
});

client.on("message", message => {
  var args = message.content.split(/[ ]+/);
  if (message.content.includes("قحبة")) {
    message.delete();
    message.channel
      .sendMessage("", {
        embed: {
          title: "لا تسب",
          color: 0x06df00,
          description:
            "مَّا يَلْفِظُ مِن قَوْلٍ إِلَّا لَدَيْهِ رَقِيبٌ عَتِيدٌ ",
          footer: {
            text: "By Dark"
          }
        }
      })
      .then(msg => {
        msg.delete(3000);
      });
  }
});

client.on("message", message => {
  var args = message.content.split(/[ ]+/);
  if (message.content.includes("wtf")) {
    message.delete();
    message.channel
      .sendMessage("", {
        embed: {
          title: "لا تسب",
          color: 0x06df00,
          description:
            "مَّا يَلْفِظُ مِن قَوْلٍ إِلَّا لَدَيْهِ رَقِيبٌ عَتِيدٌ ",
          footer: {
            text: "By Dark"
          }
        }
      })
      .then(msg => {
        msg.delete(3000);
      });
  }
});

client.on("message", message => {
  var args = message.content.split(/[ ]+/);
  if (message.content.includes("ابن ال")) {
    message.delete();
    message.channel
      .sendMessage("", {
        embed: {
          title: "لا تسب",
          color: 0x06df00,
          description:
            "مَّا يَلْفِظُ مِن قَوْلٍ إِلَّا لَدَيْهِ رَقِيبٌ عَتِيدٌ ",
          footer: {
            text: "By Dark"
          }
        }
      })
      .then(msg => {
        msg.delete(3000);
      });
  }
});

client.on("message", message => {
  var args = message.content.split(/[ ]+/);
  if (message.content.includes("fuc")) {
    message.delete();
    message.channel
      .sendMessage("", {
        embed: {
          title: "لا تسب",
          color: 0x06df00,
          description:
            "مَّا يَلْفِظُ مِن قَوْلٍ إِلَّا لَدَيْهِ رَقِيبٌ عَتِيدٌ ",
          footer: {
            text: "By Dark"
          }
        }
      })
      .then(msg => {
        msg.delete(3000);
      });
  }
});

client.on("message", message => {
  var args = message.content.split(/[ ]+/);
  if (message.content.includes("fu*")) {
    message.delete();
    message.channel
      .sendMessage("", {
        embed: {
          title: "لا تسب",
          color: 0x06df00,
          description:
            "مَّا يَلْفِظُ مِن قَوْلٍ إِلَّا لَدَيْهِ رَقِيبٌ عَتِيدٌ ",
          footer: {
            text: "By Dark"
          }
        }
      })
      .then(msg => {
        msg.delete(3000);
      });
  }
});

client.on("message", message => {
  var args = message.content.split(/[ ]+/);
  if (message.content.includes("كس")) {
    message.delete();
    message.channel
      .sendMessage("", {
        embed: {
          title: "لا تسب",
          color: 0x06df00,
          description:
            "مَّا يَلْفِظُ مِن قَوْلٍ إِلَّا لَدَيْهِ رَقِيبٌ عَتِيدٌ ",
          footer: {
            text: "By Dark"
          }
        }
      })
      .then(msg => {
        msg.delete(3000);
      });
  }
});

client.on("message", message => {
  var args = message.content.split(/[ ]+/);
  if (message.content.includes("ابوك")) {
    message.delete();
    message.channel
      .sendMessage("", {
        embed: {
          title: "لا تسب",
          color: 0x06df00,
          description:
            "مَّا يَلْفِظُ مِن قَوْلٍ إِلَّا لَدَيْهِ رَقِيبٌ عَتِيدٌ ",
          footer: {
            text: "By Dark"
          }
        }
      })
      .then(msg => {
        msg.delete(3000);
      });
  }
});

client.on("message", message => {
  var args = message.content.split(/[ ]+/);
  if (message.content.includes("امك")) {
    message.delete();
    message.channel
      .sendMessage("", {
        embed: {
          title: "لا تسب",
          color: 0x06df00,
          description:
            "مَّا يَلْفِظُ مِن قَوْلٍ إِلَّا لَدَيْهِ رَقِيبٌ عَتِيدٌ ",
          footer: {
            text: "By Dark"
          }
        }
      })
      .then(msg => {
        msg.delete(4000);
      });
  }
});

client.on("message", async message => {
  if (message.author.bot) return;
  let command = message.content.split(" ")[0].slice(prefix.length);
  let args = message.content.split(" ").slice(1);
  if (!message.content.toLowerCase().startsWith(prefix)) return;

  if (command == "deletecolors") {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(`لاتمتلك الصلاحيات لفعل ذلك! ❌`);
    message.channel.send("جاري المسح..").then(async m => {
      await message.guild.roles.forEach(role => {
        if (/^\d+$/gi.test(role.name)) {
          role.delete();
        }
      });
      m.edit(`<a:overify:688707812225712152>تم إزالة جميع الالوان.`);
    });
  }
});

const Embed = new Discord.RichEmbed();

client.on("message", message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  var command = message.content.toLowerCase().split(" ")[0];
  var args = message.content.toLowerCase().split(" ");
  var userM = message.guild.member(
    message.mentions.users.first() ||
      message.guild.members.find(m => m.id === args[1])
  );
  var prefix = "#";

  if (command == prefix + "role") {
    if (!message.member.hasPermission("MANAGE_ROLES"))
      return message.channel.send(
        ":no_entry: | ليس لديك صلاحيه **Manage Roles** "
      );
    if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES"))
      return message.channel.send(
        ":no_entry: | ليس لديك صلاحيه **Manage Roles** "
      );
    if (!message.guild.member(client.user).hasPermission("EMBED_LINKS"))
      return message.channel.send(
        ":no_entry: | ليس لديك صلاحيه **Manage Roles** "
      );

    let roleCommand = new Discord.RichEmbed()
      .setTitle(":white_check_mark: امر الرولات")
      .setColor("GREEN")
      .setDescription(
        `**\n${prefix}role <SOMEONE> <ROLE>**\n➥ \`\`لاعطاء شخص رتبه محدده.\`\`\n\n**${prefix}role humans add <ROLE>**\n➥ \`\`لااعطاء الاشخاص رتبه.\`\`\n\n**${prefix}role humans remove <ROLE>**\n➥ \`\`لازاله رتبه من الاشخاص.\`\`\n\n**${prefix}role bots add <ROLE>**\n➥ \`\`لااعطاء رتبه للبوتات.\`\`\n\n**${prefix}role bots remove <ROLE>**\n➥ \`\`لازاله رتبه من البوتات role.\`\`\n\n**${prefix}role all add <ROLE>**\n➥ \`\`لاعطاء رتبه للجميع.\`\`\n\n**${prefix}role all remove <ROLE>**\n➥ \`\`لاازاله رتبه من الجميع.\`\``
      )
      .setTimestamp()
      .setFooter(message.author.tag, message.author.avatarURL);

    if (!args[1]) return message.channel.send(roleCommand);
    if (
      !userM &&
      args[1] !== "humans" &&
      args[1] !== "bots" &&
      args[1] !== "all"
    )
      return message.channel.send(roleCommand);

    if (userM) {
      var argsRole = message.content
        .toLowerCase()
        .split(" ")
        .slice(2);
    } else if (
      args[1] === "humans" ||
      args[1] === "bots" ||
      args[1] === "all"
    ) {
      var argsRole = message.content
        .toLowerCase()
        .split(" ")
        .slice(3);
    }

    var getRole =
      message.mentions.roles.first() ||
      message.guild.roles.find(r => r.id === argsRole) ||
      message.guild.roles.find(r => r.name.toLowerCase().includes(argsRole));

    if (userM) {
      if (!getRole)
        return message.channel.send(":no_entry: | لا استطيع ايجاد الرتبه");
      if (getRole.name === "@everyone")
        return message.channel.send(":no_entry: | لا استطيع ايجاد الرتبه");
      if (
        getRole.position >=
        message.guild.member(client.user).highestRole.position
      )
        return message.channel.send(
          `:no_entry: | لا استطيع اعطاء او ازاله اي عضو من رتبه **${getRole.name}** لان الرتبه اعلي من رتبه البوت`
        );

      if (!message.guild.member(userM.user).roles.has(getRole.id)) {
        message.guild.member(userM.user).addRole(getRole.id);
        message.channel.send(
          `<a:overify:688707812225712152> | تم اعطاء رتبه  **${getRole.name}** الي **${userM.user.tag}**`
        );
      } else if (message.guild.member(userM.user).roles.has(getRole.id)) {
        message.guild.member(userM.user).removeRole(getRole.id);
        message.channel.send(
          `<a:overify:688707812225712152> | تم ازاله رتبه  **${getRole.name}** من **${userM.user.tag}**`
        );
      }
    } else if (args[1] === "humans") {
      let notArgs = new Discord.RichEmbed()
        .setTitle("<a:overify:688707812225712152> اوامر الرولات.")
        .setColor("GREEN")
        .setDescription(
          `**\n${prefix}role humans add <ROLE>**\n➥ \`\`لاعطاء شخص رتبه\`\`\n\n**${prefix}لازاله رتبه من شخض <ROLE>**\n➥ \`\`لازاله رتبه من الجميع.\`\``
        )
        .setTimestamp()
        .setFooter(message.author.tag, message.author.avatarURL);

      if (!args[2]) return message.channel.send(notArgs);
      if (!args[3]) return message.channel.send(notArgs);
      if (!getRole)
        return message.channel.send(":no_entry: | لا استطيع ايجاد الرتبه");
      if (getRole.name === "@everyone")
        return message.channel.send(":no_entry: | لا استطيع ايجاد الرتبه");

      if (args[2] === "add") {
        if (
          getRole.position >=
          message.guild.member(client.user).highestRole.position
        )
          return message.channel.send(
            `:no_entry: | لا استطيع اعطاء او او ازاله من اي شخص هذه الرتبه **${getRole.name}** لان الرتبه اعلي من رتبه البوت`
          );
        if (
          message.guild.members.filter(
            m => !message.guild.member(m).roles.has(getRole.id) && !m.user.bot
          ).size == 0
        )
          return message.channel.send(
            `:no_entry: | لا استطيع ايجاد رتبه **${getRole.name}**`
          );

        let humansSure = new Discord.RichEmbed()
          .setTitle(
            `:red_circle: هل انت متأكد من اعطاء **${
              message.guild.members.filter(
                m =>
                  !message.guild.member(m).roles.has(getRole.id) && !m.user.bot
              ).size
            }** رتبه الاشخاض **${getRole.name}**`
          )
          .setColor("gray")
          .setDescription(
            "**لديط دقيقه واحده لاختيار الرمز الذي تريد.**\n\n✅ = متأكد بانك تريد اعطاء الرول.\n\n❎ = لا تريد اعطاء الرول."
          )
          .setTimestamp()
          .setFooter(message.author.tag, message.author.avatarURL);

        message.channel.send(humansSure).then(msg => {
          msg.react("✅").then(() => msg.react("❎"));

          let giveHim = (reaction, user) =>
            reaction.emoji.name === "✅" && user.id === message.author.id;
          let dontGiveHim = (reaction, user) =>
            reaction.emoji.name === "❎" && user.id === message.author.id;
          let give = msg.createReactionCollector(giveHim, { time: 60000 });
          let dontGive = msg.createReactionCollector(dontGiveHim, {
            time: 60000
          });

          give.on("collect", r => {
            msg.delete();
            message.channel
              .send(
                `:timer: | يجب ان تنتظر بعض الوقت لاعطاء **${
                  message.guild.members.filter(
                    m =>
                      !message.guild.member(m).roles.has(getRole.id) &&
                      !m.user.bot
                  ).size
                }** رتبه الاشخاص **${getRole.name}** ...`
              )
              .then(message1 => {
                message.guild.members
                  .filter(
                    m =>
                      !message.guild.member(m).roles.has(getRole.id) &&
                      !m.user.bot
                  )
                  .forEach(m => {
                    message.guild.member(m).addRole(getRole.id);
                    setTimeout(() => {
                      message1.edit(
                        `:white_check_mark: | <@${message.author.id}><a:overify:688707812225712152> تم اعطاء جميع الاشخاص رتبه **${getRole.name}** .`
                      );
                    }, 10000);
                  });
              });
          });
          dontGive.on("collect", r => {
            msg.delete();
            message.channel
              .send(":negative_squared_cross_mark: | تم الغاء الامر.")
              .then(msg => msg.delete(5000));
          });
        });
      } else if (args[2] === "remove") {
        if (
          getRole.position >=
          message.guild.member(client.user).highestRole.position
        )
          return message.channel.send(
            `:no_entry: | لا استطيع ازاله رتبه **${getRole.name}** من اي مستخدم لان الرتبه اعلي من البوت`
          );
        if (
          message.guild.members.filter(
            m => message.guild.member(m).roles.has(getRole.id) && !m.user.bot
          ).size == 0
        )
          return message.channel.send(
            `:no_entry: | لا استطيع ايجاد شخص يحمل رتبه **${getRole.name}**`
          );

        let humansSure = new Discord.RichEmbed()
          .setTitle(
            `:red_circle: هل انت متأكد من ازاله رتبه **${getRole.name}** من **${
              message.guild.members.filter(
                m =>
                  message.guild.member(m).roles.has(getRole.id) && !m.user.bot
              ).size
            }** اشخاص`
          )
          .setColor("gray")
          .setDescription(
            "**\nلديك دقيقه واحدم لاختيار ما تريد.**\n\n✅ = متأكد من ازاله الرتبه.\n\n❎ = الغاء."
          )
          .setTimestamp()
          .setFooter(message.author.tag, message.author.avatarURL);

        message.channel.send(humansSure).then(msg => {
          msg.react("✅").then(() => msg.react("❎"));

          let removeRole = (reaction, user) =>
            reaction.emoji.name === "✅" && user.id === message.author.id;
          let dontRemoveRole = (reaction, user) =>
            reaction.emoji.name === "❎" && user.id === message.author.id;
          let remove = msg.createReactionCollector(removeRole, { time: 60000 });
          let dontRemove = msg.createReactionCollector(dontRemoveRole, {
            time: 60000
          });

          remove.on("collect", r => {
            msg.delete();
            message.channel
              .send(
                `:timer: | يكب ان تنتظر بعض الوقت لازاله الرتبه من **${
                  message.guild.members.filter(
                    m =>
                      message.guild.member(m).roles.has(getRole.id) &&
                      !m.user.bot
                  ).size
                }** رتبه الشخص **${getRole.name}**...`
              )
              .then(message1 => {
                message.guild.members
                  .filter(
                    m =>
                      message.guild.member(m).roles.has(getRole.id) &&
                      !m.user.bot
                  )
                  .forEach(m => {
                    message.guild.member(m).removeRole(getRole.id);
                    setTimeout(() => {
                      message1.edit(
                        `:white_check_mark: | <@${message.author.id}> تم ازاله رتبه **${getRole.name}** من جميع الاشخاص .`
                      );
                    }, 10000);
                  });
              });
          });
          dontRemove.on("collect", r => {
            msg.delete();
            message.channel
              .send(":negative_squared_cross_mark: | تم الغاء الامر.")
              .then(msg => msg.delete(5000));
          });
        });
      }
    } else if (args[1] === "bots") {
      let notArgs = new Discord.RichEmbed()
        .setTitle(":white_check_mark: Role Command.")
        .setColor("GREEN")
        .setDescription(
          `**\n${prefix}role bots add <ROLE>**\n➥ \`\`لاعطاء البوتات رتبه.\`\`\n\n**${prefix}role bots remove <ROLE>**\n➥ \`\`لازاله الرتبه من جميع البوتات.\`\``
        )
        .setTimestamp()
        .setFooter(message.author.tag, message.author.avatarURL); //

      if (!args[2]) return message.channel.send(notArgs);
      if (!args[3]) return message.channel.send(notArgs);
      if (!getRole)
        return message.channel.send(":no_entry: | لا استطيع ايجاد الرتبه");
      if (getRole.name === "@everyone")
        return message.channel.send(":no_entry: | لا استطيع ايجاد الرتبه");

      if (args[2] === "add") {
        if (
          getRole.position >=
          message.guild.member(client.user).highestRole.position
        )
          return message.channel.send(
            `:no_entry: | لا استطيع اعطاء اي بوت رتبه **${getRole.name}** لانها اعلي من رتبه البوت`
          );
        if (
          message.guild.members.filter(
            b => !message.guild.member(b).roles.has(getRole.id) && b.user.bot
          ).size == 0
        )
          return message.channel.send(
            `:no_entry: | لا استطيع ايجاد اي بوت لا يمتلك رتبه **${getRole.name}**`
          );

        let botsSure = new Discord.RichEmbed()
          .setTitle(
            `:red_circle: هل انت متأكد من اعطاء **${
              message.guild.members.filter(
                b =>
                  !message.guild.member(b).roles.has(getRole.id) && b.user.bot
              ).size
            }** رتبه البوتات **${getRole.name}**`
          )
          .setColor("gray")
          .setDescription(
            "**\nلديك دقيقه واحتي لتختار ما تريد**\n\n✅ = متأكد من اعطاء الرتبه\n\n❎ = الغاء."
          )
          .setTimestamp()
          .setFooter(message.author.tag, message.author.avatarURL);

        message.channel.send(botsSure).then(msg => {
          msg.react("✅").then(() => msg.react("❎")); //

          let giveHim = (reaction, user) =>
            reaction.emoji.name === "✅" && user.id === message.author.id;
          let dontGiveHim = (reaction, user) =>
            reaction.emoji.name === "❎" && user.id === message.author.id;
          let give = msg.createReactionCollector(giveHim, { time: 60000 });
          let dontGive = msg.createReactionCollector(dontGiveHim, {
            time: 60000
          });

          give.on("collect", r => {
            msg.delete();
            message.channel
              .send(
                `:timer: | يجب ان تنتظر بعض الوقت لاعطاء **${
                  message.guild.members.filter(
                    b =>
                      !message.guild.member(b).roles.has(getRole.id) &&
                      b.user.bot
                  ).size
                }** Bots the role **${getRole.name}**...`
              )
              .then(message1 => {
                message.guild.members
                  .filter(
                    b =>
                      !message.guild.member(b).roles.has(getRole.id) &&
                      b.user.bot
                  )
                  .forEach(b => {
                    message.guild.member(b).addRole(getRole.id);
                    setTimeout(() => {
                      message1.edit(
                        `:white_check_mark: | <@${message.author.id}> تم اعطاء جميع البوتات رتبه **${getRole.name}** .`
                      );
                    }, 10000);
                  });
              });
          });
          dontGive.on("collect", r => {
            msg.delete();
            message.channel
              .send(":negative_squared_cross_mark: | تم العاء الامر.")
              .then(msg => msg.delete(5000));
          });
        });
      } else if (args[2] === "remove") {
        if (
          getRole.position >=
          message.guild.member(client.user).highestRole.position
        )
          return message.channel.send(
            `:no_entry: | لا استطيع ازاله رتبه **${getRole.name}** من اي بوت لان الرتبه اعلي من البوت`
          );
        if (
          message.guild.members.filter(
            b => message.guild.member(b).roles.has(getRole.id) && b.user.bot
          ).size == 0
        )
          return message.channel.send(
            `:no_entry: | لا استطيع ايجاد اي بوت يمتلك رتبه **${getRole.name}**`
          );
        let botsSure = new Discord.RichEmbed()
          .setTitle(
            `:red_circle: هل انت متأكد من ازاله رتبه **${getRole.name}** من **${
              message.guild.members.filter(
                m => message.guild.member(m).roles.has(getRole.id) && m.user.bot
              ).size
            }** Bots?`
          )
          .setColor("RED")
          .setDescription(
            "**\nلديك دقيقه واحده لتختار ما تريد.**\n\n✅ = متأكد من ازاله الرتبه\n\n❎ = الغاء الامر"
          )
          .setTimestamp()
          .setFooter(message.author.tag, message.author.avatarURL);

        message.channel.send(botsSure).then(msg => {
          msg.react("✅").then(() => msg.react("❎"));

          let removeRole = (reaction, user) =>
            reaction.emoji.name === "✅" && user.id === message.author.id;
          let dontRemoveRole = (reaction, user) =>
            reaction.emoji.name === "❎" && user.id === message.author.id;
          let remove = msg.createReactionCollector(removeRole, { time: 60000 });
          let dontRemove = msg.createReactionCollector(dontRemoveRole, {
            time: 60000
          });

          remove.on("collect", r => {
            msg.delete();
            message.channel
              .send(
                `:timer: | يجب ان تنتظر بعض الوقت لازاله **${
                  message.guild.members.filter(
                    b =>
                      message.guild.member(b).roles.has(getRole.id) &&
                      b.user.bot
                  ).size
                }** Bots the role **${getRole.name}**...`
              )
              .then(message1 => {
                message.guild.members
                  .filter(
                    b =>
                      message.guild.member(b).roles.has(getRole.id) &&
                      b.user.bot
                  )
                  .forEach(b => {
                    message.guild.member(b).removeRole(getRole.id);
                    setTimeout(() => {
                      message1.edit(
                        `:white_check_mark: | <@${message.author.id}> تم ازاله رتبه  **${getRole.name}** من جميع البوتات`
                      );
                    }, 10000);
                  });
              });
          });
          dontRemove.on("collect", r => {
            msg.delete();
            message.channel
              .send(":negative_squared_cross_mark: | تم الغاء الامر.")
              .then(msg => msg.delete(5000));
          });
        });
      }
    } else if (args[1] === "all") {
      let notArgs = new Discord.RichEmbed()
        .setTitle(":white_check_mark: امر الرولات")
        .setColor("GREEN")
        .setDescription(
          `**\n${prefix}role all add <ROLE>**\n➥ \`\`لاعطاء الجميع رتبه\`\`\n\n**${prefix}role all remove <ROLE>**\n➥ \`\`لازاله الرتب من الجميع.\`\``
        )
        .setTimestamp()
        .setFooter(message.author.tag, message.author.avatarURL);

      if (!args[2]) return message.channel.send(notArgs);
      if (!args[3]) return message.channel.send(notArgs);
      if (!getRole)
        return message.channel.send(":no_entry: | لا استطيع ايجاد الرتبه");
      if (getRole.name === "@everyone")
        return message.channel.send(":no_entry: | لا استطيع ايجاد الرتبه");

      if (args[2] === "add") {
        if (
          getRole.position >=
          message.guild.member(client.user).highestRole.position
        )
          return message.channel.send(
            `:no_entry: | لا استطيع اعطاء اي شخص رتبه  **${getRole.name}** لان الرتبه اعلي من البوت!`
          );
        if (
          message.guild.members.filter(
            m => !message.guild.member(m).roles.has(getRole.id)
          ).size == 0
        )
          return message.channel.send(
            `:no_entry: | I can\'t find any user not have **${getRole.name}** role!`
          );

        let allSure = new Discord.RichEmbed()
          .setTitle(
            `:red_circle: Are you sure to give **${
              message.guild.members.filter(
                m => !message.guild.member(m).roles.has(getRole.id)
              ).size
            }** The role **${getRole.name}** ?`
          )
          .setColor("RED")
          .setDescription(
            "**\nلديك دقيقه واحده لتختار ما تريد.**\n\n✅ = متأكد من اعطاء الجميع رتبه.\n\n❎ = الغاء الامر."
          )
          .setTimestamp()
          .setFooter(message.author.tag, message.author.avatarURL);

        message.channel.send(allSure).then(msg => {
          msg.react("✅").then(() => msg.react("❎"));
          let giveAll = (reaction, user) =>
            reaction.emoji.name === "✅" && user.id === message.author.id;
          let dontGiveAll = (reaction, user) =>
            reaction.emoji.name === "❎" && user.id === message.author.id;
          let give = msg.createReactionCollector(giveAll, { time: 60000 });
          let dontGive = msg.createReactionCollector(dontGiveAll, {
            time: 60000
          });

          give.on("collect", r => {
            msg.delete();
            message.channel
              .send(
                `:timer: | Now you must wait some time to give **${
                  message.guild.members.filter(
                    m => !message.guild.member(m).roles.has(getRole.id)
                  ).size
                }** The role **${getRole.name}** ...`
              )
              .then(message1 => {
                message.guild.members
                  .filter(m => !message.guild.member(m).roles.has(getRole.id))
                  .forEach(m => {
                    message.guild.member(m).addRole(getRole.id);
                    setTimeout(() => {
                      message1.edit(
                        `:white_check_mark: | <@${message.author.id}> تم اعطاء الجميع رتبه **${getRole.name}** .`
                      );
                    }, 10000);
                  });
              });
          });
          dontGive.on("collect", r => {
            msg.delete();
            message.channel
              .send(":negative_squared_cross_mark: | تم الغاء الامر.")
              .then(msg => msg.delete(5000));
          });
        });
      } else if (args[2] === "remove") {
        if (
          getRole.position >=
          message.guild.member(client.user).highestRole.position
        )
          return message.channel.send(
            `:no_entry: | لا استطيع ازاله رتبه  **${getRole.name}** من اي شخص لان الرتبه اعلي من البوت`
          );
        if (
          message.guild.members.filter(m =>
            message.guild.member(m).roles.has(getRole.id)
          ).size == 0
        )
          return message.channel.send(
            `:no_entry: | لا استطيع ايجاد اي شخص يمتلك رتبه **${getRole.name}**`
          );

        let allSure = new Discord.RichEmbed()
          .setTitle(
            `:red_circle: هل انت متأكد من ازاله الرتبه **${
              getRole.name
            }** من **${
              message.guild.members.filter(m =>
                message.guild.member(m).roles.has(getRole.id)
              ).size
            }** ?`
          )
          .setColor("RED")
          .setDescription(
            "**\nلديك دقيقه واحده لتختار ما تريد**\n\n✅ = متأكد من ازاله الرتبه\n\n❎ = الغاء."
          )
          .setTimestamp()
          .setFooter(message.author.tag, message.author.avatarURL);

        message.channel.send(allSure).then(msg => {
          msg.react("✅").then(() => msg.react("❎"));

          let removeRole = (reaction, user) =>
            reaction.emoji.name === "✅" && user.id === message.author.id;
          let dontRemoveRole = (reaction, user) =>
            reaction.emoji.name === "❎" && user.id === message.author.id;
          let remove = msg.createReactionCollector(removeRole, { time: 60000 });
          let dontRemove = msg.createReactionCollector(dontRemoveRole, {
            time: 60000
          });

          remove.on("collect", r => {
            msg.delete();
            message.channel
              .send(
                `:timer: | يجب ان تنتظر بعض الوقت حتي ينتهي  **${
                  message.guild.members.filter(m =>
                    message.guild.member(m).roles.has(getRole.id)
                  ).size
                }** The role **${getRole.name}** ...`
              )
              .then(message1 => {
                message.guild.members
                  .filter(m => message.guild.member(m).roles.has(getRole.id))
                  .forEach(m => {
                    message.guild.member(m).removeRole(getRole.id);
                    setTimeout(() => {
                      message1.edit(
                        `:white_check_mark: | <@${message.author.id}> تم ازاله رتبه  **${getRole.name}** From من الجميع .`
                      );
                    }, 10000);
                  });
              });
          });
          dontRemove.on("collect", r => {
            msg.delete();
            message.channel
              .send(":negative_squared_cross_mark: | تم الغاء الامر")
              .then(msg => msg.delete(5000));
          });
        });
      }
    }
  }
});

client.on("guildMemberAdd", member => {
  const welcomer = member.guild.channels.find("name", "『𝗪elcome』");
  if (!welcomer) return;
  if (welcomer) {
    moment.locale("ar-ly");
    var m = member.user;
    let yumz = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setThumbnail(m.avatarURL)
      .setAuthor(m.username, m.avatarURL)
      .addField(
        ": تاريخ دخولك الدسكورد",
        `${moment(member.user.createdAt).format(
          "D/M/YYYY h:mm a"
        )} **\n** \`${moment(member.user.createdAt).fromNow()}\``,
        true
      )

      .setFooter(
        `${m.tag}`,
        "https://images-ext-2.discordapp.net/external/JpyzxW2wMRG2874gSTdNTpC_q9AHl8x8V4SMmtRtlVk/https/orcid.org/sites/default/files/files/ID_symbol_B-W_128x128.gif"
      );
    welcomer.send({ embed: yumz });

    const w = ["./img/1.png"];

    let Image = Canvas.Image,
      canvas = new Canvas(400, 200),
      ctx = canvas.getContext("2d");
    fs.readFile(`${w[Math.floor(Math.random() * w.length)]}`, function(
      err,
      Background
    ) {
      if (err) return console.log(err);
      let BG = Canvas.Image;
      let ground = new Image();
      ground.src = Background;
      ctx.drawImage(ground, 0, 0, 400, 200);

      let url = member.user.displayAvatarURL.endsWith(".webp")
        ? member.user.displayAvatarURL.slice(100) + ".png"
        : member.user.displayAvatarURL;
      jimp.read(url, (err, ava) => {
        if (err) return console.log(err);
        ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
          if (err) return console.log(err);

          ctx.font = "bold 12px Arial";
          ctx.fontSize = "20px";
          ctx.fillStyle = "#f1f1f1";
          ctx.textAlign = "center";
          ctx.fillText(`welcome to ${member.guild.name}`, 300, 130);

          ctx.font = "bold 12px Arial";
          ctx.fontSize = "20px";
          ctx.fillStyle = "#f1f1f1";
          ctx.textAlign = "center";
          ctx.fillText(member.user.username, 200, 150);

          let Avatar = Canvas.Image;
          let ava = new Avatar();
          ava.src = buf;
          ctx.beginPath();
          ctx.arc(77, 101, 62, 0, Math.PI * 2);
          ctx.stroke();
          ctx.clip();
          ctx.drawImage(ava, 13, 38, 128, 126);

          welcomer.sendFile(canvas.toBuffer());
        });
      });
    });
  }
});

client.on('message', message => {
    if (message.content.startsWith("#bot")) {
    message.channel.send({
        embed: new Discord.RichEmbed()
            .setAuthor(client.user.username,client.user.avatarURL)
            .setThumbnail(client.user.avatarURL)
            .setColor('RANDOM')
            .setTitle('UltraBot')
            .addField('My Ping' , [`${Date.now() - message.createdTimestamp}` + 'MS'], true)
            .addField('RAM Usage', `[${(process.memoryUsage().rss / 1048576).toFixed()}MB]`, true)
            .addField('Servers', [client.guilds.size], true)
            .addField('Rooms' , `[ ${client.channels.size} ]` , true)
            .addField('Users' ,`[ ${client.users.size} ]` , true)
            .addField('My Name' , `[ ${client.user.tag} ]` , true)
            .addField('My ID' , `[ ${client.user.id} ]` , true)
                  .addField('My Prefix' , `[ ${prefix} ]` , true)
                  .addField('My Language' , `[ Java Script ]` , true)
    })
}
});


client.on("message", message => {
  var prefix = "#";
  if (message.content.startsWith("Welcome")) {
    var mentionned = message.mentions.users.first();
    var mentionavatar;
    if (mentionned) {
      var mentionavatar = mentionned;
    } else {
      var mentionavatar = message.author;
    }
    let bot;
    if (message.author.bot) {
      bot = "Bot";
    } else {
      bot = "User";
    }
    var EsTeKnAN = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setThumbnail(`${mentionavatar.avatarURL}`)
      .addField("**شكرا الانضمامك الينا**", mentionavatar.username)
      .setDescription( "**مرحباً بك نورت السيرفر كلة **")
      .setImage(
        "https://www.askideas.com/media/13/Welcome-Signboard-Clipart.jpg"
      );
    message.channel.sendEmbed(EsTeKnAN);
  }
});

var ChannelName = "𝗪elcome";
var imageURL = "http://i8.ae/sw4p9";

//ماعليك منه :)
var _0x2347 = [
  "0x2f",
  "0x0",
  "0x10",
  "0x25",
  "0x17",
  "0x9",
  "arc",
  "0xe",
  "0x31",
  "push",
  "toLowerCase",
  "Welcome",
  "width",
  "0x14",
  "0x28",
  "0x1f",
  "toBuffer",
  "0x5",
  "shift",
  "0x3a",
  "createCanvas",
  "font",
  "#000000",
  "0x20",
  "0x3d",
  "0xd",
  "0x24",
  "0x6",
  "0x33",
  "0x15",
  "0x2d",
  "0x37",
  "0x18",
  "0x11",
  "0x29",
  "0x16",
  "beginPath",
  "send",
  "0x23",
  "0xf",
  "0x1d",
  "0x7",
  "0x36",
  "0x1",
  "0x1e",
  "0x13",
  "height",
  "0x3b",
  "fillText",
  "0x32",
  "0xb",
  "0x4",
  "find",
  "0x22",
  "0x39",
  "0x3",
  "guild",
  "0x35",
  "0x1b",
  "0x8",
  "channels",
  "0x12",
  "0x2a",
  "20px\x20sans-serif",
  "0x2",
  "0x1c",
  "loadImage",
  "closePath",
  "0x38",
  "0x30",
  "0x2b",
  "0x3c",
  "0x21",
  "0x19",
  "0x2e",
  "0x27",
  "0x1a",
  "0x26",
  "guildMemberAdd",
  "username",
  "name",
  "getContext"
];
(function(_0x419da2, _0x383103) {
  var _0x2b545e = function(_0x45d7e0) {
    while (--_0x45d7e0) {
      _0x419da2["push"](_0x419da2["shift"]());
    }
  };
  _0x2b545e(++_0x383103);
})(_0x2347, 0x105);
var _0xd058 = function(_0x419da2, _0x383103) {
  _0x419da2 = _0x419da2 - 0x0;
  var _0x2b545e = _0x2347[_0x419da2];
  return _0x2b545e;
};
var _0xaa9f = [
  _0xd058("0xe"),
  _0xd058("0x1f"),
  _0xd058("0x0"),
  _0xd058("0x15"),
  _0xd058("0x48"),
  "0x26",
  _0xd058("0x17"),
  _0xd058("0x2e"),
  "0x8",
  _0xd058("0x21"),
  _0xd058("0x45"),
  _0xd058("0x1d"),
  "fillStyle",
  _0xd058("0x1"),
  _0xd058("0x4d"),
  _0xd058("0x3d"),
  _0xd058("0x26"),
  _0xd058("0x16"),
  "Attachment",
  _0xd058("0x8"),
  _0xd058("0x7"),
  "0xd",
  _0xd058("0x3a"),
  _0xd058("0x33"),
  _0xd058("0x41"),
  _0xd058("0x12"),
  "0xe",
  _0xd058("0x25"),
  "drawImage",
  "push",
  _0xd058("0x30"),
  _0xd058("0x6"),
  _0xd058("0x11"),
  _0xd058("0x1e"),
  _0xd058("0xc"),
  _0xd058("0x49"),
  _0xd058("0x18"),
  _0xd058("0x2"),
  _0xd058("0x23"),
  _0xd058("0x34"),
  _0xd058("0x47"),
  _0xd058("0x14"),
  _0xd058("0x1c"),
  _0xd058("0x4e"),
  "0xc",
  "welcome-steve.png",
  _0xd058("0x29"),
  _0xd058("0x19"),
  _0xd058("0x3f"),
  _0xd058("0x2b"),
  "shift",
  "0x14",
  "0xa",
  _0xd058("0x40"),
  "displayAvatarURL",
  _0xd058("0x5"),
  "user",
  _0xd058("0x31"),
  _0xd058("0x28"),
  _0xd058("0x44"),
  "0x7",
  _0xd058("0x46")
];
(function(_0x1970bd, _0x2bd5c0) {
  var _0x2ca5d9 = function(_0xf614d9) {
    while (--_0xf614d9) {
      _0x1970bd[_0xd058("0x4c")](_0x1970bd[_0xd058("0x3")]());
    }
  };
  _0x2ca5d9(++_0x2bd5c0);
})(_0xaa9f, 0x198);
var _0x426f = function(_0x1183ab, _0x13ed9d) {
  _0x1183ab = _0x1183ab - 0x0;
  var _0x5221ec = _0xaa9f[_0x1183ab];
  return _0x5221ec;
};
var _0x2618 = [
  _0x426f(_0xd058("0x1a")),
  _0x426f(_0xd058("0xe")),
  "clip",
  _0x426f("0x13"),
  _0x426f(_0xd058("0x9")),
  _0x426f(_0xd058("0x4a")),
  _0x426f(_0xd058("0x20")),
  _0xd058("0x4c"),
  _0x426f(_0xd058("0x14")),
  _0x426f(_0xd058("0x2")),
  _0x426f(_0xd058("0x2a")),
  _0x426f(_0xd058("0x1b")),
  _0x426f("0x17"),
  _0x426f("0x33"),
  _0x426f("0x10"),
  _0x426f("0x11"),
  _0x426f(_0xd058("0x50")),
  _0xd058("0x1c"),
  _0x426f(_0xd058("0x17")),
  _0x426f("0x21"),
  _0x426f(_0xd058("0x26")),
  _0x426f("0x1e"),
  _0x426f(_0xd058("0xb")),
  _0x426f(_0xd058("0x37")),
  _0x426f(_0xd058("0x11")),
  _0xd058("0x24"),
  _0x426f(_0xd058("0x3b")),
  _0x426f(_0xd058("0x51")),
  _0x426f(_0xd058("0x2b")),
  _0xd058("0x42"),
  _0x426f(_0xd058("0x2e")),
  _0x426f(_0xd058("0x3d")),
  _0x426f(_0xd058("0x3e")),
  _0x426f(_0xd058("0x44")),
  _0x426f("0xc"),
  _0x426f(_0xd058("0x27")),
  _0x426f(_0xd058("0x1c")),
  _0xd058("0x2d"),
  _0x426f("0x34"),
  _0x426f("0x2c")
];
(function(_0x15aea8, _0x4fb847) {
  var _0x24c442 = function(_0x155da5) {
    while (--_0x155da5) {
      _0x15aea8[_0x426f(_0xd058("0x10"))](
        _0x15aea8[_0x426f(_0xd058("0x4a"))]()
      );
    }
  };
  _0x24c442(++_0x4fb847);
})(_0x2618, 0x6e);
var _0x5dfc = function(_0x5707f6, _0x475447) {
  _0x5707f6 = _0x5707f6 - 0x0;
  var _0xf78845 = _0x2618[_0x5707f6];
  return _0xf78845;
};
var _0x5bdb = [
  _0x5dfc(_0x426f(_0xd058("0x36"))),
  _0x5dfc(_0xd058("0x24")),
  _0x5dfc(_0xd058("0x3c")),
  _0x5dfc(_0x426f(_0xd058("0x3d"))),
  _0x426f(_0xd058("0x48")),
  _0x426f(_0xd058("0x4b")),
  _0xd058("0x4f"),
  _0x426f(_0xd058("0x28")),
  _0x5dfc(_0x426f(_0xd058("0x13"))),
  _0x5dfc(_0x426f(_0xd058("0x1d"))),
  _0x5dfc(_0xd058("0xb")),
  _0x5dfc(_0x426f(_0xd058("0x3a"))),
  _0x5dfc(_0x426f(_0xd058("0x2c"))),
  _0x426f("0xa"),
  _0x5dfc(_0x426f(_0xd058("0x0"))),
  _0x5dfc(_0x426f(_0xd058("0x11"))),
  _0x5dfc(_0x426f(_0xd058("0x18"))),
  _0x426f(_0xd058("0x35")),
  _0x5dfc(_0x426f("0x34")),
  _0x5dfc("0x2"),
  _0x5dfc(_0x426f(_0xd058("0x1c"))),
  _0x5dfc(_0x426f(_0xd058("0x45"))),
  _0x5dfc(_0xd058("0x32"))
];
(function(_0x6a7433, _0xf2d278) {
  var _0x3b55ee = function(_0x5667b8) {
    while (--_0x5667b8) {
      _0x6a7433[_0x5dfc(_0x426f(_0xd058("0xd")))](
        _0x6a7433[_0x5dfc(_0x426f(_0xd058("0x44")))]()
      );
    }
  };
  _0x3b55ee(++_0xf2d278);
})(_0x5bdb, 0x12c);
var _0x295d = function(_0x1ce238, _0x204e2d) {
  _0x1ce238 = _0x1ce238 - 0x0;
  var _0x3786a1 = _0x5bdb[_0x1ce238];
  return _0x3786a1;
};
client["on"](_0x295d(_0x5dfc(_0xd058("0x14"))), async _0x3f598d => {
  var _0x1676f9 = _0x3f598d[_0x295d(_0x426f(_0xd058("0x2c")))][
    _0x295d(_0x5dfc(_0x426f("0x22")))
  ][_0x295d(_0x5dfc(_0xd058("0x28")))](
    _0x251528 =>
      _0x251528[_0x426f(_0xd058("0x22"))] ===
      ChannelName[_0x295d(_0x5dfc(_0x426f(_0xd058("0x4"))))]()
  );
  if (!_0x1676f9) return ![];
  var _0x117902 = Canvas[_0x5dfc(_0x426f("0x2f"))](0x190, 0xc8);
  var _0x32a566 = _0x117902[_0x295d(_0x5dfc(_0x426f(_0xd058("0xa"))))]("2d");
  const _0x17b206 = await Canvas[_0x295d(_0x5dfc(_0x426f(_0xd058("0x8"))))](
    imageURL
  );
  const _0x4d1b4c = await Canvas[_0x295d(_0x5dfc(_0xd058("0x17")))](
    _0x3f598d[_0x295d(_0x5dfc(_0x426f(_0xd058("0x2f"))))][
      _0x5dfc(_0xd058("0x44"))
    ]
  );
  _0x32a566[_0x295d(_0x5dfc(_0x426f(_0xd058("0x31"))))](
    _0x17b206,
    0x0,
    0x0,
    _0x117902[_0x295d(_0x5dfc(_0x426f(_0xd058("0x38"))))],
    _0x117902[_0x295d(_0x426f(_0xd058("0x43")))]
  );
  _0x32a566[_0x295d(_0x5dfc(_0x426f("0x24")))] = _0x295d(
    _0x426f(_0xd058("0xb"))
  );
  _0x32a566[_0x295d(_0x5dfc(_0x426f("0xb")))] = _0x295d(
    _0x5dfc(_0xd058("0x0"))
  );
  _0x32a566[_0x295d(_0x5dfc("0x1"))](
    "" + _0x3f598d[_0x295d("0x7")][_0x295d(_0x5dfc(_0x426f(_0xd058("0x20"))))],
    0xc8,
    0x78
  );
  _0x32a566[_0x295d(_0x5dfc(_0x426f(_0xd058("0xb"))))] = _0x295d(
    _0x5dfc(_0x426f(_0xd058("0xf")))
  );
  _0x32a566[_0x295d(_0x5dfc(_0x426f(_0xd058("0x23"))))] = _0x295d(
    _0x5dfc(_0x426f(_0xd058("0x32")))
  );
  _0x32a566[_0x295d(_0x5dfc(_0x426f("0x6")))](
    _0x295d(_0x426f(_0xd058("0x18"))),
    0xaa,
    0x50
  );
  _0x32a566[_0x426f("0x1d")]();
  _0x32a566[_0x295d(_0x5dfc(_0x426f(_0xd058("0x24"))))](
    0x64,
    0x64,
    0x46,
    0x0,
    Math["PI"] * 0x2,
    !![]
  );
  _0x32a566[_0x295d(_0x426f(_0xd058("0x38")))]();
  _0x32a566[_0x295d(_0x426f(_0xd058("0x31")))]();
  _0x32a566[_0x5dfc(_0x426f(_0xd058("0x3d")))](
    _0x4d1b4c,
    0x19,
    0x19,
    0xb4,
    0x96
  );
  _0x1676f9[_0x5dfc("0x21")](
    new Discord[_0x295d(_0x5dfc(_0x426f(_0xd058("0x46"))))](
      _0x117902[_0x426f(_0xd058("0x3c"))](),
      _0x295d(_0x5dfc(_0x426f(_0xd058("0x39"))))
    )
  );
});



client.on("guildMemberAdd", member => {
  var embed = new Discord.RichEmbed()
    .setAuthor(member.user.username, member.user.avatarURL)
    .setThumbnail(member.user.avatarURL)
    .setTitle(`ولكم`)
    .setDescription(`ولكم منور السيرفر`)
    .addField("👤  انت العضو رقم", `**[ ${member.guild.memberCount} ]**`, true)
    .setColor("RED")
    .setFooter(
      `====انشالله يعجبك السيرفر====`,
      "https://cdn.discordapp.com/attachments/397818254439219217/399292026782351381/shy.png"
    );

  var channel = member.guild.channels.find("name", "𝗪elcome");
  if (!channel) return;
  channel.send({ embed: embed });
});
client.on("guildMemberAdd", member => {
  member
    .createDM()
    .then(function(channel) {
      return channel.send(`
**Welcome To Server :rose:**
#**NAME** ${member}
#**Member Count** ${member.guild.memberCount} `);
    })
    .catch(console.error);
});


const yt = require('ytdl-core');
 
 
 

 

client.on('message', message => { // اقتراح
    if (message.content.startsWith(prefix + 'sug')) {
        if (message.author.bot) return
        if (!message.guild) return message.reply('**:x: This Commands Just In Server**').then(v => {v.react('❌')})
        var args =  message.content.split(' ').slice(1).join(' ')
        if (!args) return message.reply('Type You Suggestion').then(c => {c.delete(5000)})
        let Room = message.guild.channels.find(`name`, "𝗦uggest")
        if (!Room) return message.channel.send("Can't find suggestions channel.").then(d => d.react('❌'))
        let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setAuthor(`Vote on ${message.author.username}'s suggestion`, message.author.avatarURL)
        .addField('**Suggestion**',`${args}`)
        .setThumbnail(message.author.avatarURL)
        .setFooter(`ID: ${message.author.id}`)
        Room.sendEmbed(embed).then(c => {
            c.react('✅').then(() => 
                c.react('❌'))

        }).catch(e => console.error(e)
        )
    }
});

client.on("message", async message => {
  const moment = require("moment"); //npm i moment
  const ms = require("ms"); //npm i ms
  var time = moment().format("Do MMMM YYYY , hh:mm");
  var room;
  var title;
  var duration;
  var currentTime = new Date(),
    hours = currentTime.getHours() + 3,
    minutes = currentTime.getMinutes(),
    done = currentTime.getMinutes() + duration,
    seconds = currentTime.getSeconds();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  var suffix = "AM";
  if (hours >= 12) {
    suffix = "PM";
    hours = hours - 12;
  }
  if (hours == 0) {
    hours = 12;
  }

  var filter = m => m.author.id === message.author.id;
  if (message.content.startsWith(prefix + "gcreate")) {
    let embed1 = new Discord.RichEmbed()
      .setColor()
      .setDescription("Missing the following permission `MANAGE_GUILD`");

    let embed2 = new Discord.RichEmbed()
      .setColor()
      .setDescription("Please send the `room` name without mentioning it  -  من فضلك اكتب اسم الروم");

    let embed3 = new Discord.RichEmbed()
      .setColor()
      .setDescription("Wrong room name  -  اسم خاطئ");

    let embed4 = new Discord.RichEmbed()
      .setColor()
      .setDescription("Please send the `time`  - من فضلك اكتب الوقت");

    let embed5 = new Discord.RichEmbed()
      .setColor()
      .setDescription(
        "Wrong time format\nExample of time format: 1s / 1m / 1h / 1d / 1w"
      );

    let embed6 = new Discord.RichEmbed()
      .setColor()
      .setDescription("من فضلك اكتب الجائزة - Please Type The Presnt");

    if (!message.guild.member(message.author).hasPermission("MANAGE_GUILD"))
      return message.channel.send(embed1);
    message.channel.send(embed2).then(msg => {
      message.channel
        .awaitMessages(filter, {
          max: 1,
          time: 20000,
          errors: ["time"]
        })
        .then(collected => {
          let room = message.guild.channels.find(
            "name",
            collected.first().content
          );
          if (!room) return message.channel.send(embed3);
          room = collected.first().content;
          collected.first().delete();
          msg.edit(embed4).then(msg => {
            message.channel
              .awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ["time"]
              })
              .then(collected => {
                if (!collected.first().content.match(/[1-60][s,m,h,d,w]/g))
                  return message.channel.send(embed5);
                duration = collected.first().content;
                collected.first().delete();
                msg.edit(embed6).then(msg => {
                  message.channel
                    .awaitMessages(filter, {
                      max: 1,
                      time: 20000,
                      errors: ["time"]
                    })
                    .then(collected => {
                      title = collected.first().content;
                      collected.first().delete();
                      msg.delete();
                      message.delete();
                      try {
                        let giveEmbed = new Discord.RichEmbed()
                          .setColor()
                          .setTitle(`${title}`)
                          .setDescription(
                            `React With <a:gifwin:688728774245744677> To Enter! \nTime remaining : ${duration} \n **Created at :** ${hours}:${minutes}:${seconds} ${suffix}`
                          );
                        //.setFooter(message.author.username, message.author.avatarURL);
                        message.guild.channels
                          .find("name", room)
                          .send(" :tada: **Giveaway** :tada:", {
                            embed: giveEmbed
                          })
                          .then(m => {
                            let re = m.react("🎉");
                            setTimeout(() => {
                              let users = m.reactions.get("🎉").users;
                              let list = users
                                .array()
                                .filter(
                                  u => (u.id !== m.author.id) !== client.user.id
                                );
                              let gFilter =
                                list[
                                  Math.floor(Math.random() * list.length) + 1
                                ];
                              if (gFilter === undefined) {
                                let endEmbed = new Discord.RichEmbed()
                                  .setColor()
                                  .setTitle(title)
                                  .setDescription(
                                    `Winners : no enough number of reaction so there is no winner
                                    الفائز : لا يوجد عدد كافي من الرياشكنات   `
                                  )
                                  .setFooter("Ended at :")
                                  .setTimestamp();
                                m.edit("**  <a:gifwin:688728774245744677> GIVEAWAY ENDED  <a:gifwin:688728774245744677>**", {
                                  embed: endEmbed
                                });
                              } else {
                                let endEmbed = new Discord.RichEmbed()
                                  .setColor()
                                  .setTitle(title)
                                  .setDescription(`Winners : ${gFilter}`)
                                  .setFooter("Ended at :")
                                  .setTimestamp();
                                m.edit("** <a:gifwin:688728774245744677> GIVEAWAY ENDED <a:gifwin:688728774245744677>**", {
                                  embed: endEmbed
                                });
                              }
                              if (gFilter === undefined) {
                                // message.guild.channels.find("name" , room).send("No enough number of reactions")
                              } else {
                                message.guild.channels
                                  .find("name", room)
                                  .send(
                                    `Congratulations ${gFilter}! You won The \`${title}\`<a:gifwin:688728774245744677>`
                                  );
                              }
                            }, ms(duration));
                          });
                      } catch (e) {
                        message.channel.send(
                          `:heavy_multiplication_x:| **i Don't Have Prem**`
                        );
                        console.log(e);
                      }
                    });
                });
              });
          });
        });
    });
  }
});


client.on('message', message => { 
    if (message.content.startsWith(prefix + 'AllEmojis')) {

        const List = message.guild.emojis.map(e => e.toString()).join(" ");

        const ايموجات = new Discord.RichEmbed()
            .setTitle('➠ الرموز التعبيرية :') 
            .setAuthor(message.guild.name, message.guild.iconURL) 
            .setColor('RANDOM') 
            .setDescription(List) 
            .setFooter(message.guild.name) 
        message.channel.send(ايموجات) 

    }
});

client.on('message', message => {
    if (message.content.startsWith("#صور")) {
if(!message.channel.guild) return;
        var mentionned = message.mentions.users.first();
    var client;
      if(mentionned){
          var client = mentionned; } else {
          var client = message.author;
      }
        const embed = new Discord.RichEmbed()
                           .addField('صـور مـن:', "<@" + message.author.id + ">")
        .setColor(000000)
        .setImage(`${client.avatarURL}`)
      message.channel.sendEmbed(embed);
    }
});