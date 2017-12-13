// Discord.js bot
const Discord = require('discord.js');
const client = new Discord.Client();
const request = require('request');

var worldsData = "";

// things to do on startup
// 1. Pull data from league esports API
request('http://api.lolesports.com/api/v1/scheduleItems?leagueId=9', { json:true }, (err, res, body) => {
	if (err) { return console.log(err); }
	worldsData = body;
	});

// when client is ready
client.on('ready', () => {
    client.user.setGame('League of Leggos');
});

// things to do on intervals
// 1. Pull league esports API data every day
setInterval(() => {
    request('http://api.lolesports.com/api/v1/scheduleItems?leagueId=9', { json:true }, (err, res, body) => {
        if (err) { return console.log(err); }
	worldsData = body;
    });
}, 86400000);

// 2. every 30 minutes check if match is upcoming
setInterval(() => {
    var now = Date.now();
    var channel = client.channels.get("278038929720999937");
    for (i = 0; i < worldsData.scheduleItems.length; i++) {
	if (worldsData.scheduleItems[i].scheduledTime.startsWith("2017")) {
	    var time = worldsData.scheduleItems[i].scheduledTime;
	    console.log("Checking time of match");
	    var matchDate = new Date(time);
	    var diff = now - matchDate.getTime();
	    if ((diff <= 3600000) && (diff >= 0)) {
		 // Construct string for match
		 var req = "http://api.lolesports.com/api/v2/highlanderMatchDetails?tournamentId=a246d0f8-2b5c-4431-af4c-b872c8dee023&matchId=" + worldsData.scheduleItems[i].match;
                 var str = "";
		 request(req, { json:true }, (err, res, body) => { 
                           if (err) { return console.log(err); }
                           str = body.teams[0].name + " versus " + body.teams[1].name + " is coming up soon!";
                 });
                 // About an hour until match starts, post a message in general
	         channel.sendMessage(str);
            }
        }
    }
}, 3000000);
//1800000



// FIXME: hardcoded value for start index of scheduleEvent Array
var scheduleStart = 182;

// for every 5 min check if event in 

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
	      "\"That's literally the only reason I took the offer\" - Betsy",
		"\"This is me playing League of Leggins\" - Machuka",
		"\"He might know martial arts\" - Machuka",
		"\"We got ads on Gnar? This ain't no sponsored thing\" - Machuka",
		"\"I can't believe I got a big splat\" - Machuka acout his weird pixel square",
		"\"I hate Vayne with a passion.\" - Machuka",
		"\"I'm gonna give this Veigar the business\" - Machuka",
		"\"Much gate, much wow\" - Machuka",
		"\"Did you see how useless you were our last game?\" - Machuka",
		"\"Ryze is useless\" - Machuka",
		"\"I am perfectly fine with sleeping on the floor\" - cshang",
		"\"We'll just end up smelling like each other, but that's ok\" - Julian",
		"\"Let's go, forget cshang!\" - Julian",
		"\"Win10 bash is trash\" - Julian",
		"\"Yeah, Japan's like the bacon.\" - Julian",
		"\"So you're just making things up.\" - Julian",
		"\"Destructive motherfucker\" - Betsy",
		"\"YOU CAN'T KILL ME\" - Betsy",
		"\"Something something up my butt\" - Betsy",
		"\"I'm shook\" - Heather",
		"\"Ten cuidado\" - Heather",
    "\"D-d-d-d-dj Creyslz\" - Machuka",
    "\"Is this 2017 right now?\" - Machuka",
    "\"Fucking potatoes\" - Machuka",
    "\"Charles fell! Charles, are you okay?\" - Machuka",
    "\"It was 1905\" - Machuka",
    "\"Yah I'm cooking...my stomach!!\" - Machuka",
    "\"He could've had two\" - Machuka",
    "\"If I gotta grow up, you gotta grow up\" - Machuka",
    "\"I wanna see people cry again\" - Machuka",
    "\"Why I have an ad? Why are they talking to me about Chrome Remote Desktop I already know how to do it!!!\" - Machuka",
    "\"It's either me or her\" - Machuka",
    "\"Just throw it on it\" - Machuka",
    "\"Just say like kowabunga or something...it's my safe word\" - Machuka",
    "\"I'm not paying you guys to stay still\" - Machuka",
    "\"Dude, I got ten achievements and I just logged on\" - Machuka",
    "\"Shit Charles, you're drinking already? It's not even Thursday\" - Machuka",
    "\"I don't like his face\" - Machuka",
    "\"Hey [so and so], hit me with that dab\" - Machuka",
    "\"I see you\" - Machuka",
    "\"Like, comment, and subscribe\" - Machuka",
    "\"I work every other day\" - Machuka",
    "\"This map kicked me out 4 times before I started\" - Machuka",
    "\"Is there a 12 o'clock everyday?\" - Machuka",
    "\"I was like bamboozled\" - Machuka",
    "\"Fast game, gg\" - Machuka, before we all died",
    "\"Don't tell me what to do\" - Machuka",
    "\"I might as well be Chinese\" - Machuka",
    "\"I can read lips\" - Machuka",
    "\"SSG is Korean?\" - Machuka",
    "\"[items]...in the butt\" - Machuka",
    "\"What kind of wings? Hot wings?\" - Machuka",
    "\"There's so many ways to pronounce it\" - Machuka",
    "\"Yeah, we want that, what's up girl\" - Machuka",
    "\"Did she pee on it?\" - Machuka",
    "\"SHE DID PEE ON IT\" - Machuka",
    "\"A little freaky, but I dig it\" - Machuka",
    "\"I wanna make macaroni\" - Machuka",
    "\"I gave them the business and left my business card\" - Machuka",
    "\"Charles takes exhaust\" - Machuka",
    "\"Nope, but you have an m and an a and a h. Good enough.\" - Machuka",
    "\"Gnar, save yourself before you ded\" - Machuka",
    "\"Gnar is Korean'd out\" - Machuka",
    "\"211399\" - Machuka",
    "\"That's even worse than the Jew\" - Machuka",
    "\"I don't think I can make it anymore\" - Machuka",
    "\"How the hell did we win with a bot\" - Machuka",
    "\"We've lost 4 games in a row\" - Julian",
    "\"I did so much\" - Julian",
    "\"Don't worry, it takes like 5 games\" - Julian",
    "\"Invite that fool\" - Julian",
    "\"It's ok, it just means I have to carry less people for now\" - Julian",
    "\"This is garbage\" - Julian",
    "\"Karate kid!\" - Julian",
    "\"This MC so scum\" - Julian",
    "\"Get out of there Karate Kid, it's a trap\" - Julian",
    "\"You need your Mr. Miyagi, dude, put you in your place\" - Julian",
    "\"Dude, you a two timer\" - Julian",
    "\"It's a trap\" - Julian",
    "\"Stop\" - Julian",
    "\"I'll throw a dirty sock at you\" - Julian",
    "\"I'm not a nice person when I'm hangry\" - Julian",
    "\"Charles, wrong chat\" - Julian",
    "\"Could've played another game with us\" - Betsy",
    "\"Why would you do that when you have Charles?\" - Julian",
    "\"Is that why it's called DOTA?\" - Betsy",
    "\"I was writing my cousin's essay\" - Betsy",
    "\"Monika, pls\" - Betsy",
    "\"I didn't expect it to be so hot, Jaden-sama\" - Betsy",
    "\"This is just the beginning\" - Betsy",
    "\"I don't think I can be friends with you anymore\" - cshang",
    "\"This is like steamed kale League of Legends\" - cshang",
    "\"Not like how he's saying the words, but it's like another instrument almost\" - cshang",
    "\"Where are your dudes?\" - cshang",
    "\"I think those are guys\" - cshang",
    "\"CAN'T CATCH THIS\" - cshang",
    "\"I think you're the most innately toxic of us\" - cshang @julian
    "\"I did the same amount of damage as Betsy, you, and Alex combined\" - cshang",
    "\"Julian, I think for your last item you should go --oh fuck\" - cshang",
    "\"Jasmine oil\" - cshang",
    "\"Lazy programming\" - cshang",
    "\"I'm just here to tell you guys I'm done playing league\" - cshang literally gettting into the voice comms for a minute",
    "\"Just casting out the line and seeing if he bites\" - cshang",
    "\"Now that I think about it, I'm not sure what your first name is\" - cshang @joo",
    "\"I'M GOING TO GO AP XIN ZHAO\" - cshang",
    "\"Pham what are yo --wait, wrong call\" - cshang",
    "\"If there's a [new] weird pick each game and it goes to 5 games, I will buy a C9 flair\" - cshang",
    "\"Keyboard. Yes.\" - cshang",
    "\"This is just ripping people off\" - cshang",
    "\"You should show this to Betsy\" - Heather",
    "\"It's her jasmine oil\" - Heather"   
		]

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
