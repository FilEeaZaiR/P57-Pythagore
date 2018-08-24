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
    
    if(message.content.startsWith(prefix + "suggestion")) {
        let args = message.content.split(" ").slice(1);
        let ThingToEcho = args.join(" ")
        var news_embed = new Discord.RichEmbed()
            .addField(`Suggestion de ${message.author.tag} :`, ThingToEcho)
            .setColor("RANDOM")
            .setFooter(`Suggestion - P57 | Pythagore`)
            .setTimestamp()
        message.channel.send(news_embed)
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
        .addField(":link: voici mes réseaux : \n\n", "\n\nYouTube :\n https://www.youtube.com/channel/UCI0gT-5EEKgXq6xgwZ-kfXg")
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
