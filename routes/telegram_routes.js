const { Router } = require('express')
const TelegramChat = require('../models/TelegramChat')
const router = Router()

router.post('/auth', async (req, res) => {
    try {
        const prevChat = await TelegramChat.findOne({
            id: req.body.chatId,
        })
        if (prevChat == null){
            const chat = new TelegramChat({
                id: req.body.chatId,
            })
            await chat.save()
            res.status(201).send('Create new chat')
        } else {
            res.status(200).send('Chat already created')
        }
    } catch (error) {
        res.status(500).send('Chat is not created')
    }
})

router.get('/get', async (_, res) => {
    const chats = await TelegramChat.find({})
    res.send(chats)
})

router.delete('/delete-all', async (_, res) => {
    try {
        await TelegramChat.deleteMany({})
        res.status(200).send('Deleted all Chats')
    } catch (error) {
        res.status(500).send('Chats is not deleted')
    }
})


module.exports = router