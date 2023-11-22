import express from 'express'
import Chat from '../models/chat'
import Message from '../models/message'
import { async } from '@firebase/util'

const router = express.Router()

router.get('/:chat_id', async (req, res) => {
    try{
        const chat_id = req.params?.chat_id
        if (!chat_id) {
            return res.status(400).send('Body not match')
        }
        const message = await Message.find({
            chat_id: chat_id
        })
        if (!message) {
            return res.status(400).send('Message not found')
        }
        return res.status(200).send(message)
    } catch (error) {
        return res.status(500).send(error)
    }
})

export default router