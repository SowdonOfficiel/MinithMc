const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const ms = require("ms");
const bot = new Discord.Client({disableEveryone: true});

var servers = {};

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setPresence({game: { name: 'MinithMc', type: 0} });
});

bot.on("guildMemberAdd", member -> {
  let role = member.guild.roles.find("name", "🙇🏻‍♂️Minithien🙇🏻‍♂️");
  let annoncechannel = member.guild.channels.find("name", "join-and-leave");

  let joinEmbed = new Discord.RichEmbed()
  .setDescription("๑۩۞۩๑ Bienvenue ! ๑۩۞۩๑")
  .setColor("#FFA07A")
  .addField("Bienvenue", `${member.user.username}`)
  .addField("Passe un bon moment sur le discord de MinithMc.");

  annoncechannel.send(kickEmbed);


})

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if (message.content === 'ping') {
    message.channel.send('pong');
  }

  if (message.content === 'hey') {
    message.channel.send('coucou');
  }

  if(message.content === "Raconte moi une blague" || message.content === "dis moi une blague MinithMc" || message.content === "raconte moi une blague"){
    random();

    if(randnum == 1){
      message.reply("Un fils demande à son père : \n - Papa,c'est quoi la beauté? \n - Tu vois ta mère ? \n - Oui \n - Et ben c'est pas ça!");
    }

    if(randnum == 2){
      message.reply("Un jour Dieu dit à Casto de ramer. \n Et depuis, castorama...");
    }

    if(randnum == 3){
      message.reply("Quelle est la différence entre une échelle et un pistolet ? \n L'échelle sert à monter, le pistolet sert à descendre.");
    }

    if(randnum == 4){
      message.reply("Pourquoi un chasseur emmène-t-il son fusil aux toilettes ? \n Pour tirer la chasse.");
    }

    if(randnum == 5){
      message.reply("Vous connaissez l'histoire de l'armoire ? \n Elle est pas commode...");
    }

    if(randnum == 6){
      message.reply("Dans la phrase **le voleur a volé une télévision**, où est le sujet ? \n En prison !");
    }

    if(randnum == 7){
      message.reply("- Les gens devraient dormir leur fenêtre ouverte... \n - Pourquoi, vous êtes medecin ? \n - Non, cambrioleur !");
    }

    if(randnum == 8){
      message.reply("Que fait une vache quand elle a les yeux fermés ? \n - Elle fabrique du lait concentré!");
    }

    if(randnum == 9){
      message.reply("L'autre jour, j’ai raconté une blague sur Carrefour, mais elle a pas supermarché…");
    }

    if(randnum == 10){
      message.reply("L'autre jour, j’ai raconté une blague sur Carrefour, mais elle a pas supermarché…");
    }
  }

  if(cmd == `${prefix}kick`){

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Impossible de trouver l'utilisateur !");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission pour kick !");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous ne pouvez pas kick cette utilisateur !");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("๑۩۞۩๑ LOG - Kick (Discord) ๑۩۞۩๑")
    .setColor("#e56b00")
    .addField("Kick user", `${kUser} with ID ${kUser.id}`)
    .addField("Kick by", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Raison", kReason)
    .addField("Time", message.createdAt);

    message.guild.member(kUser).send("Vous avez était kick du discord de **MinithMc** ! Pour :", kReason);

    let logchannel = message.guild.channels.find(`name`, `logs`);
    if(!logchannel) return message.guild.channel.send("Erreur, merci de contacter Sowdon !");

    message.delete().catch(O_o=>{});

    message.guild.member(kUser).send("Vous avez était kick du discord de **MinithMc** ! Pour :", kReason);
    message.guild.member(kUser).kick(kReason);
    logchannel.send(kickEmbed);


    return;

  }

  if(cmd == `${prefix}clear`){
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission pour clear !");
    if(!args[0]) return message.channel.send("Vous devez préciser combien de message je dois clear !");
    message.channel.bulkDelete(args[0]).then(() => {
      message.channel.send(`Clear de ${args[0]} messages.`).then(msg => msg.delete(5000));
  })

  return;
  }

  if(cmd == `${prefix}say`){
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission pour faire parler le bot !");
    let botmessage = args.join(" ");
    message.delete().catch();
    message.channel.send(botmessage);
  }

  if(cmd == `${prefix}mute`){
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tomute) return message.channel.send("Impossible de trouver l'utilisateur !");
    let mReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission pour mute !");
    if(tomute.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous ne pouvez pas ban cette utilisateur !");

    let muteEmbed = new Discord.RichEmbed()
    .setDescription("๑۩۞۩๑ LOG - MUTE (Discord) ๑۩۞۩๑")
    .setColor("#bc0000")
    .addField("Mute user", `${tomute} with ID ${tomute.id}`)
    .addField("Mute by", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Raison", mReason);


    let muterole = message.guild.roles.find(`name`, "🤐 Mute 🤐");
    let mutetime = args[1];
    if(!mutetime) return message.reply("Vous devez préciser combien de temps il doit être mute !");

      await(tomute.addRole(muterole.id));
      let logchannel = message.guild.channels.find(`name`, `logs`);
      if(!logchannel) return message.guild.channel.send("Erreur, merci de contacter Sowdon !");
      logchannel.send(muteEmbed);

      message.delete().catch(O_o=>{});

      setTimeout(function(){
        tomute.removeRole(muterole.id);
        let unmuteEmbed = new Discord.RichEmbed()
        .setDescription("๑۩۞۩๑ LOG - UNMUTE (Discord) ๑۩۞۩๑")
        .setColor("#bc0000")
        .addField("UNMute user :", `${tomute} with ID ${tomute.id}`)
        let logchannel = message.guild.channels.find(`name`, `logs`);
        if(!logchannel) return message.guild.channel.send("Erreur, merci de contacter Sowdon !");
        logchannel.send(unmuteEmbed);
        message.delete().catch(O_o=>{});
      }, ms(mutetime));

    return;
  }

  if(cmd === `${prefix}ban`){
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Impossible de trouver l'utilisateur !");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission pour ban !");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous ne pouvez pas ban cette utilisateur !");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("๑۩۞۩๑ LOG - BAN (Discord) ๑۩۞۩๑")
    .setColor("#bc0000")
    .addField("Ban user", `${bUser} with ID ${bUser.id}`)
    .addField("Ban by", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Raison", bReason)
    .addField("Time", message.createdAt);

    message.guild.member(bUser).send("Vous avez était ban du discord de **MinithMc** ! Pour :", bReason);

    let logchannel = message.guild.channels.find(`name`, `logs`);
    if(!logchannel) return message.guild.channel.send("Erreur, merci de contacter Sowdon !");

    message.delete().catch(O_o=>{});

    message.guild.member(bUser).ban(bReason);
    logchannel.send(banEmbed);


    return;
  }

  if(cmd === `${prefix}report`){

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Impossible de trouver l'utilisateur !");
    let reason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#15f153")
    .addField("User", `${rUser} with ID: ${rUser.id}`)
    .addField("Report by", `${message.author} with ID: ${message.author.id}`)
    .addField("Raison", reason)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt);

    let reportschannel = message.guild.channels.find(`name`, `reports`);
    if(!reportschannel) return message.guild.channel.send("Erreur, merci de contacter Sowdon !");

    message.delete().catch(O_o=>{});

    reportschannel.send(reportEmbed);

    return;





  }

});

function random(min, max){
  min = Math.ceil(0);
  max = Math.floor(10);
  randnum = Math.floor(Math.random() * (max - min +1) + min);
}

bot.login(botconfig.token);
