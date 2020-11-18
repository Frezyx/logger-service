const { Router } = require('express')
const TelegramChat = require('../models/TelegramChat')
const router = Router()

router.post('/auth', async (req, res) => {
    try {
        const chat = new TelegramChat({
            id: req.body.chatId,
        })
        await chat.save()
        res.status(201).send('Create new chat')
    } catch (error) {
        res.status(500).send('Chat is not created')
    }
})

router.get('/get', async (_, res) => {
    const chats = await TelegramChat.find({})
    res.send(chats)
})


module.exports = router