const TelegramChat = require('../models/TelegramChat')
const axios = require('axios')

const tgApiPath = 'https://api.telegram.org/bot'
const sendHeader = '/sendMessage'

class TelegramBotService {
    static async sendAlerts(alert){
        
        const chats = await TelegramChat.find({})
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