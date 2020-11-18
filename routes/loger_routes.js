const { Router } = require('express')
const Log = require('../models/Log')
const router = Router()

router.get('/get', async (_, res) => {
  const logs = await Log.find({})
  res.send(logs)
})

router.post('/create', async (req, res) => {
    try {
        const log = new Log({
            message: req.body.message,
            error: req.body.error,
            type: req.body.type,
            stackTrace: req.body.stackTrace,
            date: req.body.date
        })
        await log.save()
        res.status(201).send('Create new log')
    } catch (error) {
        res.status(500).send('Log is not created')
    }
})

router.delete('/delete-all', async (_, res) => {
    try {
        await Log.deleteMany({})
        res.status(201).send('Deleted all logs')
    } catch (error) {
        res.status(500).send('Logs is not deleted')
    }
})

router.delete('/delete', async (req, res) => {
    try {
        const log = await Log.findOne({
            message: req.body.message,
            error: req.body.error,
            type: req.body.type,
            stackTrace: req.body.stackTrace,
            date: req.body.date
        })
        await Log.deleteOne({_id: log._id})
        res.status(201).send('Log is deleted')
    } catch (error) {
        res.status(500).send('Log is not deleted')
    }
})

module.exports = router