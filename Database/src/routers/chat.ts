import express from 'express'
import Chat from '../models/chat'
import Message from '../models/message'
import { async } from '@firebase/util'
import { createSchema, editSchema } from '../schemas/chat'

const router = express.Router()

router.get('/:chat_id', async (req, res) => {
    try{
        const chat_id = req.params?.chat_id
        if (!chat_id) {
            return res.status(400).send('Body not match')
        }
        const chat = await Chat.findById(chat_id).populate('messages')
        if (!chat) {
            return res.status(400).send('Chat not found')
        }
        return res.status(200).send(chat.messages)
    } catch (error) {
        return res.status(500).send(error)
    }
})

router.post('/create/:tid', async (req, res) => {
    try{
        const tid = req.params?.tid
        if (!tid) {
            return res.status(400).send('Body not match')
        }

        const createData = {
            _id: tid,
            messages: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        const message = await Message.create({
            //text: createData.data.text,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        const chat = await Chat.findById(tid)
        if (!chat) {
            return res.status(400).send('Chat not found')
        }
        chat.messages.push(message._id)
        await chat.save()
        return res.status(200).send(message)
    } catch (error) {
        return res.status(500).send(error)
    }
})

export default router