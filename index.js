//Base bot discord :
const Discord = require('discord.js');

const client = new Discord.Client();

//Variables :

var fs = require('fs');

var prefix = "P|";

function game1(){
    client.user.setActivity("Besoin d'aide ? " + prefix + "help");
    setTimeout(game2, 30000);
};

function game2(){
    client.user.setActivity(`P57 | Private By FilEeaZaiR | Fryano`);
    setTimeout(game3, 30000);
};

function game3(){
    client.user.setActivity(`${client.users.size} users`);
    setTimeout(game1, 30000);
};

//Login + connexion du bot :
client.login(process.env.TOKEN);

client.on("ready", () => {
    console.log("Connexion en cours ...");
    setTimeout(game1, 30000);
});

client.on("guildMemberAdd", member => {
    const bvn = member.guild.channels.find(m => m.name === "général");
if(!bvn) return;
let regles = member.guild.channels.find("name", "règles");
bvn.send(`Bienvenue ${member}, n'hésite pas à lire les ` + regles + ` pour plus d'informations !`)
})

client.on("guildMemberAdd", member => {
    const logs = member.guild.channels.find(m => m.name === "logs");
    if (!logs) return;
const embed = new Discord.RichEmbed()
  .setColor('#FE6F01')
  .setAuthor(member.user.tag, member.user.avatarURL)
  .setTitle("Arrivée d'un nouvel utilisateur")
  .addField("Un nouvel utilisateur vient d'arriver", `Il s'agit de [${member.user.tag}]`, true)
  .addField(`Nombre de membres après l'arrivée de __${member.user.tag}__`, member.guild.memberCount)
  .setFooter(`ID : ${member.user.id} | FilEeaZaiR#1258`)
  .setTimestamp()
logs.send({embed})
});

client.on("guildMemberRemove", member => {
    const bvn = member.guild.channels.find(m => m.name === "logs")
    if (!bvn) return;
    const embed = new Discord.RichEmbed()
    .setColor('#009114')
    .setAuthor("Départ d'un utilisateur", member.user.avatarURL)
    .setThumbnail(member.user.avatarURL)
    .setDescription(`Aurevoir **${member.user.tag}**\n` +
    `Il y a maintenant **${member.guild.memberCount} membres**`)
    .setImage("http://www.lesaffaires.com/uploads/images/normal/578f645f2123b12d0257dfa1fbdb8fff.jpg")
    .setFooter(`ID : ${member.user.id}`)
    .setTimestamp()
    bvn.send(embed)
});

client.on("guildMemberRemove", member => {
    const logs = member.guild.channels.find(m => m.name === "logs");
    if (!logs) return;
const embed = new Discord.RichEmbed()
.setColor('#FE6F01')
.setAuthor(member.user.tag, member.user.avatarURL)
.setTitle("Départ d'un utilisateur")
.addField("Il s'agit de", `[${member.user.tag}]`, true)
.addField(`Nombre de membres après le départ de __${member.user.tag}__`, member.guild.memberCount)
.setFooter(`ID : ${member.user.id} | FilEeaZaiR#1258`)
.setTimestamp()
logs.send({embed})
});

client.on("channelCreate", channel => {
  if(!channel.guild) return;
  const logs = channel.guild.channels.find(m => m.name === "logs");
  if (!logs) return;
  const embed = new Discord.RichEmbed()
  .setColor('#FE6F01')
  .setAuthor(client.user.tag, client.user.avatarURL)
  .setTitle("Nouveau salon créé ! :white_check_mark:")
  .addField("Channel créé !",`Le nom : **${channel.name}**`)
  .addField(`Nombre de salons après l'ajout du salon **${channel.name}**`, channel.guild.channels.size)
  .setFooter(`ID : ${channel.id} | FilEeaZaiR#1258`)
  .setTimestamp()
  logs.send({embed})
});

client.on("channelDelete", channel => {
    const logs = channel.guild.channels.find(m => m.name === "logs");
    if (!logs) return;
const embed = new Discord.RichEmbed()
.setColor('#FE6F01')
.setAuthor(client.user.tag, client.user.avatarURL)
.setTitle("Un salon a été supprimé ! :white_check_mark:")
.addField("Salon supprimé !",`Son nom : **${channel.name}**`)
.addField(`Nombre de salons après la suppression du salon **${channel.name}**`, channel.guild.channels.size)
.setFooter(`ID : ${channel.id} | FilEeaZaiR#1258`)
.setTimestamp()
logs.send({embed})
});

client.on("roleCreate", role => {
    const logs = role.guild.channels.find(m => m.name === "logs");
    if (!logs) return;
const embed = new Discord.RichEmbed()
.setColor("#FE6F01")
.setAuthor(client.user.tag, client.user.avatarURL)
.setTitle("Un rôle a été créé ! :white_check_mark:")
.addField("Rôle créé !", `Son nom : **${role.name}**`)
.addField(`Nombre de rôles après l'ajout du rôle **${role.name}**`, role.guild.roles.size)
.setFooter(`ID : ${role.id} | FilEeaZaiR#1258`)
.setTimestamp()
logs.send({embed})
});

client.on("roleDelete", role => {
    const logs = role.guild.channels.find(m => m.name === "logs");
    if (!logs) return;
const embed = new Discord.RichEmbed()
.setColor("#FE6F01")
.setAuthor(client.user.tag, client.user.avatarURL)
.setTitle("Un rôle a été supprimé ! :white_check_mark:")
.addField("Rôle supprimé !", `Son nom : **${role.name}**`)
.addField(`Nombre de rôles après la supression du rôle **${role.name}**`, role.guild.roles.size)
.setFooter(`ID : ${role.id} | FilEeaZaiR#1258`)
.setTimestamp()
logs.send({embed})
});

client.on("messageUpdate", (oldMessage, newMessage) => {
  if(!newMessage.guild) return;
    const logs = newMessage.guild.channels.find(m => m.name === "logs");
    if (!newMessage.guild.channels.exists('name','★logs★')) return;
  newMessage.guild.channels.find("name", "★logs★")
    if (!logs) return console.log("Salon Logs absent!");
    if(oldMessage.author.bot || oldMessage.cleanContent === newMessage.cleanContent) return;
    let embed = new Discord.RichEmbed()
    .setAuthor(newMessage.member.user.tag, newMessage.member.user.avatarURL)
    .setColor("#FE6F01")
    .setTitle("Un message a été modifié ! :white_check_mark:")
    .setDescription(`Le message de ${newMessage.author} a été modifié`)
    .addField("Message Avant", `${oldMessage.cleanContent}`)
    .addField("Message Après", `${newMessage.cleanContent}`)
    .setFooter(`ID : ${newMessage.member.user.id} | FilEeaZaiR#1258`)
    .setTimestamp()
    return logs.send({embed})
    });
client.on("messageDelete", (message) => {
  if (message.author.bot) return;
    const logs = message.guild.channels.find(m => m.name === "logs");
    if (!logs) return;
    let embed = new Discord.RichEmbed()
    .setAuthor(message.member.user.tag, message.member.user.avatarURL)
    .setColor("#FE6F01")
    .setTitle("Un message a été supprimé ! :white_check_mark:")
    .setDescription(`Le message de ${message.author} a été supprimé`)
    .addField(`Message Supprimé`, `${message.cleanContent}`)
    .setFooter(`ID : ${message.author.id} | FilEeaZaiR#1258`)
    .setTimestamp()
    logs.send({embed})
  });

  client.on('guildBanAdd', (guild, user)=> {
      if(!guild) return;
      const logs = guild.channels.find(m => m.name === "logs");
      if (!guild.channels.exists('name','logs')) return;
      guild.channels.find("name", "logs")
      if (!logs) return;
      let embed = new Discord.RichEmbed()
      .setAuthor("Ban", user.avatarURL)
      .setColor("#FE6F01")
      .setTitle("Un utilisateur a été ban ! :white_check_mark:")
      .setDescription(`Utilisateur ban : ${user}`)
      .setThumbnail(user.avatarURL)
      .addField("Nombre de membres après le ban", guild.memberCount)
      .setFooter(`ID : ${user.id}`)
      .setTimestamp()
      logs.send({embed})
  });

  client.on('guildBanRemove', (guild, user)=> {
      if(!guild) return;
      const logs = guild.channels.find(m => m.name === "logs");
      if (!guild.channels.exists('name','logs')) return;
      guild.channels.find("name", "logs")
      if (!logs) return;
      let embed = new Discord.RichEmbed()
      .setAuthor("Unban", user.avatarURL)
      .setColor("#FE6F01")
      .setTitle("Un utilisateur a été unban ! :white_check_mark:")
      .setDescription(`Utilisateur unban : ${user}`)
      .setThumbnail(user.avatarURL)
      .addField("Nombre de membres", guild.memberCount)
      .setFooter(`ID : ${user.id}`)
      .setTimestamp()
      logs.send({embed})
  })

client.on(`message`, message =>{

    if(message.content === prefix + "help") {
        var mod_embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle(`Besoin d'aide ?`)
        .setThumbnail(message.author.avatarURL)
        .addField(":tools: Voici mes commandes modérations et d'administration !\n\n",
        ":thumbsup: :thumbsdown: " + prefix + "suggestion :" + ` Faire une Suggestion (commandes pour le bot ou tracks pour Pythagore57) !\n\n` +
        ":clipboard: " + prefix + "news :" + ` Faire une News !\n\n` +
        ":book: " + prefix + "report :" + ` report une personne ! (ex : P|report @FilEeaZair#1258 test)\n\n` +
        ":link: " + prefix + "link :" + ` liens des réseaux de Pythagore !\n\n` +
        ":pause_button: " + prefix + "mute <@user> : " + "Mute l'utilisateur mentionné !\n\n" +
        ":arrow_forward: " + prefix + "unmute <@user> : " + "Unmute l'utilisateur mentionné !\n\n" +
        ":warning: " + prefix + "warns <@user> : " + "warn l'utilisateur mentionné \n\n" +
        ":warning: " + prefix + "deletewarns <@user> : " + "enlever un warn à l'utilisateur mentionné \n\n" +
        ":warning: " + prefix + "seewarns <@user> : " + "voir les warns de l'utilisateur mentionné \n\n" +
        ":sparkles: " + prefix + "purge / clear : " + "Supprimer tous les messages (impossible de supprimer au-delà de 15 jours) !\n\n" )
        .setFooter("Commande d'aide - By FilEeaZaiR")
        .setTimestamp()
        message.channel.send(mod_embed);
    }

    if(message.content.startsWith(prefix + "news")) {
        if(message.guild.member(message.author).roles.find("name", "News")){
            let args = message.content.split(" ").slice(1);
            let ThingToEcho = args.join(" ")
            var news_embed = new Discord.RichEmbed()
                .addField("Nouveauté :", ThingToEcho)
                .setColor("RANDOM")
                .setFooter(`News par ${message.author.tag} - P57 | Pythagore`)
                .setTimestamp()
            message.channel.send(news_embed)
            message.delete()
        }else{
            return message.channel.send(" désolé, mais tu n'as pas la permission")
        }
    }
    
    //if(message.content.startsWith(prefix + "annonce")) {
        //if(message.guild.member(message.author).roles.find("name", "Annonce")){
            //let args = message.content.split(" ").slice(1);
            //let ThingToEcho = args.join(" ")
            //var annonce_embed = new Discord.RichEmbed()
                //.addField("Annonce :", ThingToEcho)
                //.setColor("RANDOM")
                //.setFooter(`Annonce par ${message.author.tag} - P57 | Pythagore`)
                //.setTimestamp()
            //message.channel.send(annonce_embed)
            //message.delete()
        //}else{
            //return message.channel.send(" désolé, mais tu n'as pas la permission")
        //}
    //}
    
    if(message.content.startsWith(prefix + "suggestion")) {
        let args = message.content.split(" ").slice(1);
        let ThingToEcho = args.join(" ")
        var suggestion_embed = new Discord.RichEmbed()
            .addField(`Suggestion de ${message.author.tag} :`, ThingToEcho)
            .setColor("RANDOM")
            .setFooter(`Suggestion - P57 | Pythagore`)
            .setTimestamp()
        message.guild.channels.find("name", "coin-admin").send(suggestion_embed)
        message.delete()
    }

    if(message.content.startsWith(prefix + "purge") || message.content.startsWith(prefix + "clear")) {
        let myrole = message.guild.member(client.user).hasPermission("MANAGE_MESSAGES"); //Récupère les droits nécessaires
        let yourole = message.guild.member(message.author).hasPermission("MANAGE_MESSAGES"); //Récupère les droits nécessaires
    
        if (!myrole) {
            return message.channel.send(":no_entry:**Je n'ai pas les permissions nécessaires pour effacer un/des message(s)**");
        }
    
        if (!yourole) {
            return message.channel.send(":no_entry:**Vous n'avez pas les permissions nécessaires**");
        }
    
        var suppression = message.content.substr(8);
        if (suppression < 2 || suppression > 10001) {
            return message.reply(":warning:**La valeur que vous avez entré est invalide, merci de choisir une valeur comprise entre 2 et 10000**");
        }
        message.channel.bulkDelete(suppression, true).then(ok => {
            message.reply("**Suppression de " + "" + suppression + "" + " messages**")
            .then(message => setTimeout(function(){message.delete()}, 1000))
            .catch(err => console.log(err));
        
    })
    }

    if(message.content === prefix + "link") {
        var link_embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .addField(":link: voici mes réseaux : \n\n",
        "\n\nYouTube :\n https://www.youtube.com/channel/UCI0gT-5EEKgXq6xgwZ-kfXg" + 
        "\n\nGmail : \n tmpythagore57@gmail.com")
        .setFooter(`Commande utilisé par ${message.author.tag} - P57 | Pythagore`)
        .setTimestamp()
        message.channel.send(link_embed)
    }

    if(message.content.startsWith(prefix + "report")) {
            let args = message.content.split(" ").slice(1);
            let ThingToEcho = args.join(" ")
            var report_embed = new Discord.RichEmbed()
                .addField("Report :", ThingToEcho)
                .setColor("RANDOM")
                .setFooter(`Report de ${message.author.tag} - P57 | Pythagore`)
                .setTimestamp()
            message.guild.channels.find("name", "coin-admin").send(report_embed)
            message.delete()
    }

    if(message.content.startsWith(prefix + "mute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission !");
    
        if(message.mentions.users.size === 0) {
            return message.channel.send("Tu dois mentionner quelqu'un pour faire cette commande");
        }
    
        let membre = message.guild.member(message.mentions.users.first());
        if(!membre) {
            return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");
        }
    
        let mute = message.guild.roles.find("name", "Mute");
        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission !");
        
        else{
            membre.addRole(mute)
            message.channel.send(`${membre.user.username} a été mute par ${message.author.username} !`);
        }
    }

    if(message.content.startsWith(prefix + "unmute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission !");
    
        if(message.mentions.users.size === 0) {
            return message.channel.send("Tu dois mentionner quelqu'un pour faire cette commande");
        }
    
        let membre = message.guild.member(message.mentions.users.first());
        if(!membre) {
            return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");
        }
    
        let mute = message.guild.roles.find("name", "Mute");
        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission !");
        
        else{
            membre.removeRole(mute)
            message.channel.send(`${membre.user.username} a été unmute par ${message.author.username} !`);
        }
    }

    let warns = JSON.parse(fs.readFileSync("./warns.json", "utf8"));
 
if (message.content.startsWith(prefix + "warn")){
 
if (message.channel.type === "dm") return;
 
var mentionned = message.mentions.users.first();
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
 
if(message.mentions.users.size === 0) {
 
    return message.channel.send("**:x: Vous n'avez mentionnée aucun utilisateur**");
 
}else{
 
    const args = message.content.split(' ').slice(1);
 
    const mentioned = message.mentions.users.first();
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size != 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
 
          if (args.slice(1).length != 0) {
 
            const date = new Date().toUTCString();
 
            if (warns[message.guild.id] === undefined)
 
              warns[message.guild.id] = {};
 
            if (warns[message.guild.id][mentioned.id] === undefined)
 
              warns[message.guild.id][mentioned.id] = {};
 
            const warnumber = Object.keys(warns[message.guild.id][mentioned.id]).length;
 
            if (warns[message.guild.id][mentioned.id][warnumber] === undefined){
 
              warns[message.guild.id][mentioned.id]["1"] = {"raison": args.slice(1).join(' '), time: date, user: message.author.id};
 
            } else {
 
              warns[message.guild.id][mentioned.id][warnumber+1] = {"raison": args.slice(1).join(' '),
 
                time: date,
 
                user: message.author.id};
 
            }
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
message.delete();
 
            message.channel.send(':warning: | **'+mentionned.tag+' à été averti**');
 
message.mentions.users.first().send(`:warning: **Warn |** depuis **${message.guild.name}** donné par **${message.author.username}**\n\n**Raison:** ` + args.slice(1).join(' '))
 
          } else {
 
            message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
 
          }
 
        } else {
 
          message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
 
        }
 
      } else {
 
        message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
 
      }
 
    } else {
 
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
 
    }
 
  }
 
}
 
 
 
  if (message.content.startsWith(prefix+"seewarns")||message.content===prefix+"seewarns") {
 
if (message.channel.type === "dm") return;
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
 
    const mentioned = message.mentions.users.first();
 
    const args = message.content.split(' ').slice(1);
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size !== 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
 
          try {
 
            if (warns[message.guild.id][mentioned.id] === undefined||Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
 
              message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");
 
              return;
 
            }
 
          } catch (err) {
 
            message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");
 
            return;
 
          }
 
          let arr = [];
 
          arr.push(`**${mentioned.tag}** a **`+Object.keys(warns[message.guild.id][mentioned.id]).length+"** warns :eyes:");
 
          for (var warn in warns[message.guild.id][mentioned.id]) {
 
            arr.push(`**${warn}** - **"`+warns[message.guild.id][mentioned.id][warn].raison+
 
            "**\" warn donné par **"+message.guild.members.find("id", warns[message.guild.id][mentioned.id][warn].user).user.tag+"** a/le **"+warns[message.guild.id][mentioned.id][warn].time+"**");
 
          }
 
          message.channel.send(arr.join('\n'));
 
        } else {
 
          message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");
 
          console.log(args);
 
        }
 
      } else {
 
        message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");
 
      }
 
    } else {
 
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
 
    }
 
  }
 
 
 
 
 
  if (message.content.startsWith(prefix+"deletewarns")||message.content===prefix+"deletewarns") {
 
if (message.channel.type === "dm") return;
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
 
   const mentioned = message.mentions.users.first();
 
    const args = message.content.split(' ').slice(1);
 
    const arg2 = Number(args[1]);
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size != 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">"){
 
          if (!isNaN(arg2)) {
 
            if (warns[message.guild.id][mentioned.id] === undefined) {
 
              message.channel.send(mentioned.tag+" n'a aucun warn");
 
              return;
 
            } if (warns[message.guild.id][mentioned.id][arg2] === undefined) {
 
              message.channel.send("**:x: Ce warn n'existe pas**");
 
              return;
 
            }
 
            delete warns[message.guild.id][mentioned.id][arg2];
 
            var i = 1;
 
            Object.keys(warns[message.guild.id][mentioned.id]).forEach(function(key){
 
              var val=warns[message.guild.id][mentioned.id][key];
 
              delete warns[message.guild.id][mentioned.id][key];
 
              key = i;
 
              warns[message.guild.id][mentioned.id][key]=val;
 
              i++;
 
            });
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
            if (Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
 
              delete warns[message.guild.id][mentioned.id];
 
            }
 
            message.channel.send(`Le warn de **${mentioned.tag}**\': **${args[1]}** a été enlevé avec succès!`);
 
            return;
 
          } if (args[1] === "tout") {
 
            delete warns[message.guild.id][mentioned.id];
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
            message.channel.send(`Les warns de **${mentioned.tag}** a été enlevé avec succès!`);
 
            return;
 
          } else {
 
            message.channel.send("Erreur mauvais usage: "+prefix+"deletewarns <utilisateur> <nombre>");
 
          }
 
        } else {
 
          message.channel.send("Erreur mauvais usage: "+prefix+"deletewarns <utilisateur> <nombre>");
 
        }
 
      } else {
 
       message.channel.send("Erreur mauvais usage: "+prefix+"deletewarns <utilisateur> <nombre>");
 
      }
 
    } else {
 
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
 
    }
 
  }

});
