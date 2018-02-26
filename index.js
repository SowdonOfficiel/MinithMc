const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const got = require('got');

const bot = new Discord.Client({disableEveryone: true});

const API_KEY = 'dc6zaTOxFJmzC';

bot.on("ready", async () => {
  console.log(`${bot.user.username} est connecte`);
  bot.user.setPresence({game: { name: 'Version : ALPHA-0.3.1', type: 0} });
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if (message.content === 'ping' || message.content == 'Ping') {
    message.channel.send('pong');
  }

  if (message.content === 'hey') {
    message.channel.send('coucou');
  }

  if(cmd == `${prefix}help`){
    message.reply("```Les commandes : \n > -help : permet d'obtenir de l'aide. \n > -bot : permet d'obtenir des informations sur le bot \n > -info : permet d'obtenir des informations sur le discord. \n > -discord : permet d'obtenir le discord de **Zirow**. \n > -ban @user *raison* : permet de bannir un utilisateur du discord. \n > -kick @user *raison* : permet de kick un utilisateur. \n > -clear *message* : permet de clear des messages. \n > -report @user *raison* : permet de report un utilisateur. \n ```");
  }

  //Autobannisement pour certain mot

  if (message.content === 'tg' || message.content == 'Tg' || message.content == 'TG') {
    message.delete();
    message.author.send('**[WARN]** > Pour des raisons de sécurité, le mot **tg** est banni !');
  }

  if (message.content === 'pute' || message.content == 'Pute' || message.content == 'PUTE') {
    message.delete();
    message.author.send('**[WARN]** > Pour des raisons de sécurité, le mot **pute** est banni !');
  }

  if (message.content === 'fdp' || message.content == 'FDP' || message.content == 'fils de pute') {
    message.delete();
    message.author.send('**[WARN]** > Pour des raisons de sécurité, le mot **fdp** est banni !');
  }

  if (message.content === 'salope' || message.content == 'Salope' || message.content == 'SALOPE') {
    message.delete();
    message.author.send('**[WARN]** > Pour des raisons de sécurité, le mot **salope** est banni !');
  }

  if (message.content === 'ntm' || message.content == 'NTM' || message.content == 'nique ta mère') {
    message.delete();
    message.author.send('**[WARN]** > Pour des raisons de sécurité, le mot **ntm** est banni !');
  }

  if (message.content === 'connard' || message.content == 'Connard' || message.content == 'CONNARD') {
    message.delete();
    message.author.send('**[WARN]** > Pour des raisons de sécurité, le mot **connard** est banni !');
  }

  if (message.content === 'vagin' || message.content == 'Vagin' || message.content == 'VAGIN') {
    message.delete();
    message.author.send('**[WARN]** > Pour des raisons de sécurité, le mot **vagin** est banni !');
  }

  if (message.content === 'kikou' || message.content == 'Kikou' || message.content == 'KIKOU') {
    message.delete();
    message.author.send('**[WARN]** > Pour des raisons de sécurité, le mot **kikou** est banni !');
  }




  if(cmd == `${prefix}info`){
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Information concernant le discord")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Membre :", message.guild.memberCount)
    .addField("Crée le:", message.guild.createdAt)
    .addField("Vous avez rejoint le discord le", message.member.joinedAt);

    return message.channel.send(serverembed);
  }

  if(cmd == `${prefix}gif`){
    if (args.length < 1) {
        throw 'Vous devez fournir quelque chose à rechercher!';
    }

    const res = await got(`http://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${encodeURIComponent(args.join(' '))}`, { json: true });

    if (!res || !res.body || !res.body.data) {
        throw 'Impossible de trouver un fichier GIF correspondant à votre requête!';
    }

    message.delete();
    let gifembed = new Discord.RichEmbed()
    .setDescription("Générateur de GIF !")
    .setColor("#15f153")
    .addField("Image :", res.body.data.image_url);

    return message.channel.send(gifembed);
  }

  if(cmd == `${prefix}discord`){
    message.reply("**Voici le discord de** *Zirow* : **https://discord.gg/Rb32qkX");
  }

  if(cmd == `${prefix}say`){
    if(message.member.id !== "361495811554803713"){
      message.reply("Vous n'avez pas la permission de faire parler le bot !");
      return;
    } else {
      //if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission pour faire parler le bot !");
      let botmessage = args.join(" ");
      message.delete().catch();
      message.channel.send(botmessage);
    }

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

    //message.guild.member(kUser).sendMessage("Vous avez était kick du discord de **MinithMc** ! Pour :", kReason);

    let logchannel = message.guild.channels.find(`name`, `logs`);
    if(!logchannel) return message.guild.channel.send("Erreur, merci de contacter Sowdon !");

    message.delete().catch(O_o=>{});

    message.guild.member(kUser).kick(kReason);
    logchannel.send(kickEmbed);


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

    //message.guild.member(bUser).send("Vous avez était ban du discord de **MinithMc** ! Pour :", bReason);

    let logchannel = message.guild.channels.find(`name`, `logs`);
    if(!logchannel) return message.guild.channel.send("Erreur, merci de contacter Sowdon !");

    message.delete().catch(O_o=>{});

    message.guild.member(bUser).ban(bReason);
    logchannel.send(banEmbed);


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

    if(randnum == 11){
      message.reply("Deux ballons discutent : \n - Si on allait s'éclater, dit l'un ? \n - T'es pas un peu gonflé, lui répond l'autre !");
    }

    if(randnum == 12){
      message.reply("Qu'est-ce qu'un roux sur une bicyclette ? \n Un 3 roues...");
    }

    if(randnum == 13){
      message.reply("- Docteur j'ai mal à l'oeil qauche quand je bois mon café. \n - Essayez d'enlever la cuillère de la tasse.");
    }

    if(randnum == 14){
      message.reply("Au téléphone: \n - Tu connais Sarah ? \n - Sarah qui ?  \n - Ca raccroche");
    }

    if(randnum == 15){
      message.reply("Quelle est la capitale de l'île de Tamalou ? \n Gébobola ! ");
    }

    if(randnum == 16){
      message.reply("Quelle est la différence entre un ascenseur et une cigarette ?  \n Il n'y en a pas. Tous les deux font des cendres...");
    }

    if(randnum == 17){
      message.reply("Quels sont les fruits que nous trouvons dans toutes les maisons ? \n les coins et les mûres. ");
    }

    if(randnum == 18){
      message.reply("Quel est l'animal qui a le plus de dents ? \n La petite souris !");
    }

    if(randnum == 19){
      message.reply("- Tu te souviens du prénom d'Alzheimer ? \n - Non \n - Tu vois ça commence comme ça !");
    }

    if(randnum == 20){
      message.reply("Qu'est-ce qu'un tube de colle avec une cape ? \n SuperGlue");
      //page 7
    }
  }
});

  function random(min, max){
    min = Math.ceil(0);
    max = Math.floor(20);
    randnum = Math.floor(Math.random() * (max - min +1) + min);
  }

bot.login(process.env.TOKEN);
