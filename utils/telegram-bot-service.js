const TelegramChat = require('../models/TelegramChat')
const axios = require('axios')

const tgApiPath = 'https://api.telegram.org/bot'
const sendHeader = '/sendMessage'

class TelegramBotService {
    static async sendAlerts(log){
        const chats = await TelegramChat.find({})
        var alert = `⛔️Exception in application
        \n \r Message: ${log.message},`

        if(log.error != null){
            alert += `\n \r Exception: ${log.error},`
        }
        if(log.type != null){
            alert += `\n \r Type: ${log.type},`
        }
        if(log.stackTrace != null){
            alert += `\n \r StackTrace: ${log.stackTrace},`
        }
        if(log.date != null){
            alert += `\n \r Time: ${log.date},`
        }

        if(chats != null && chats.length > 0){
            chats.forEach(chat => {
                this.sendAlert(alert, chat.id);
            });
        }
    }

    static async sendAlert(alert, id){
        const botApiPath = tgApiPath + process.env.TELEGRAMTOKEN
        const data = {
            chat_id: id,
            text: alert
        };
        axios.post(botApiPath + sendHeader, data)
    }
}

module.exports = TelegramBotService