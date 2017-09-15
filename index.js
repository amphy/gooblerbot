// Discord.js bot
const Discord = require('discord.js');
const client = new Discord.Client();

var quotes = ["\"Can the text-to-speech do this?\" - Machuka",
	      "\"Now we know what you listen to!!!\" - cshang's friends after misposting k-pop",
	      "\"For my stream\" - Machuka",
	      "\"Skins get wins\" - Machuka",
	      "\"If you wanna do it, I'll put you in my YouTube channel\" - Machuka",
	      "\"This is why they call me the baconator\" - Machuka",
	      "\"Just need to find my wallet\" - cshang on impulse buying Star Guardian Ezreal",
	      "\"Intuition is bad\" - cshang",
	      "\"200 to 300 mpg\" - cshang on the mileage his dad's car gets",
	      "\"Sona is so OP\" - Julian",
	      "\"If we win this one, we play URF\" - Julian",
	      "\"If we lose this one, we play URF\" - Julian",
	      "\"That's literally the only reason I took the offer\" - Betsy"]

client.on('ready', () => {
    client.user.setGame('League of Leggos');
});

client.on('message', msg => {
    if (msg.content.startsWith("ping")) {
    	msg.channel.send("pong!");
    }

    if (msg.content.startsWith("foo")) {
        msg.channel.send("bar");
    }

    if (!msg.content.startsWith(process.env.PREFIX) || !msg.guild) return;
    const command = msg.content.split(' ')[0].substr(process.env.PREFIX.length);
    const args = msg.content.split(' ').slice(1).join(' ');
    if (command === 'guide') return msg.channel.send('https://git.io/d.js-heroku');
    else if (command === 'invite') return msg.channel.send(process.env.INVITE);
    else if (command === 'quote') return msg.channel.send(quotes[Math.floor(Math.random()*quotes.length)]);
});

client.login(process.env.BOT_TOKEN);

// This part keeps the bot on 24/7
// Web app (Express + EJS)
const http = require('http');
const express = require('express');
const app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 5000;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the `public` directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', (request, response) => {
    // ejs render automatically looks in the views folder
    response.render('index');
});

app.listen(port, () => {
    // will echo 'Our app is running on http://localhost:5000 when run locally'
    console.log('Our app is running on http://localhost:' + port);
});

// pings server every 15 minutes to prevent dynos from sleeping
setInterval(() => {
 http.get('http://gooblerbot.herokuapp.com');
}, 900000);
