import express from 'express'
import Chat from '../models/chat'
import Message from '../models/message'
import { async } from '@firebase/util'
import { createSchema } from '../schemas/message'
import { string } from 'zod'

const router = express.Router()

interface IChat {
    _id: string;
    name: string;
    messages: string[];
    createdAt: Date;
    updatedAt: Date;
}

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

router.post('/create/:tid/:chatname', async (req, res) => {
    try{
        const tid = req.params?.tid
        const chatname = req.params?.chatname
        if (!tid) {
            return res.status(400).send('Body not match')
        }

        const chatData: IChat = {
            _id: tid,
            name: chatname,
            messages: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        const messageData = createSchema.safeParse(req.body)
        if (!messageData.success) {
            return res.status(400).send('Body not match')
        }
        const msg = await Message.create({
            username: messageData.data.username,
            content: messageData.data.content,
            isNotGPT: messageData.data.isNotGPT,
            type: messageData.data.type,
            chatid: tid,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        if (!msg) {
            return res.status(400).send('Message not found')
        }
        chatData.messages.push(msg._id)
        const chat = await Chat.create(chatData)
        if (!chat) {
            return res.status(400).send('Chat not found')
        }
    } catch (error) {
        return res.status(500).send(error)
    }
})

export default router