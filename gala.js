const Discord = require('discord.js');
const { prefix, token } = require('./config.json')
const client = new Discord.Client();
var portre = true;
client.once('ready', () => {
	console.log('Ready!');
});

client.login(token);
client.on('message', message => {
    //if message does not start with a prefix or the message was sent by the bot: return nothing
    if (!message.content.startsWith(`${prefix}`) || message.author.bot ) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/); //makes array of arguements
    const command = args.shift().toLowerCase();//the specified command without a prefix

    if (command === 'args-info') {
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }
        message.channel.send(`Command name: ${args[0]}\nArguments: ${args[1]}`)
    }else if (command === 'reporttoggle'){
        if (portre === true){
            portre = false;
            return message.channel.send('The report command is now disabled')
        } else if (portre === false){
            portre = true;
            return message.channel.send('The report command is now enabled')
        }
    }
     else if(portre === true){
        if (command === 'report') {
            if (!message.mentions.users.size){
                return message.reply('you need to tag a user bruv')
            }
            const taggedUser = message.mentions.users.first();
                if(message.author.id === taggedUser.id){
                    return message.reply("you can't tag yourself bruv")
                } else {
                    return message.reply(`You have reported: <@${taggedUser.id}>`)
                }
        }
    } else if(portre === false){
        if (command === 'report') {
            return message.reply('The report command is currently disabled')
        }
    } 

})



