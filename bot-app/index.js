/*
    @covidgrambot app 
    Author: Jahongir Sobirov
    Version: 0.0.1
    License: MIT
    All right reserver (c) 2021
*/
const { Telegraf } = require('telegraf');
const covidApi = require('covid19-api')
var bot = new Telegraf('1926649885:AAGN_xvSglVRNb3o9wKq6v0j692gf3ngceE'); 
bot.start(ctx => ctx.reply(`
   	Salom ${ctx.from.first_name}!
	Covidgrambot orqali siz Covid-19 statistikasini o'zbek tilida bilib olasiz.
	/help kalit so'zi orqali ko'proq ma'lumot oling!
`))

bot.help(ctx => ctx.reply(`
	Qaysi davlatning covid-19 statistikasi kerak bo'lsa Ingliz tilida o'sha davlat nomini yozing.
	Loyiha yaratuvchisi: @jah0ngirsobirov07
`))

bot.on('text', async (ctx) => {
   try {
       const userText = ctx.message.text
       const covidData = await covidApi.getReportsByCountries(userText)
       const countryData = covidData[0][0]
       const formatData = `Davlat: ${countryData.country},
           Kasalanganlar: ${countryData.cases},
           O'lim holati: ${countryData.deaths},
           Sog'ayganlar: ${countryData.recovered}`
       ctx.reply(formatData)
   } catch(e) {
       ctx.reply('Bunday davlat topilmadi')
   }
})

bot.launch();
