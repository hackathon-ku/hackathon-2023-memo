import express from 'express'
import { createSchema } from '../schemas/message'
import Chat from '../models/chat'
import Message from '../models/message'

const router = express.Router()

router.post("/create", async (req, res) => {
    try {
        const createData = createSchema.safeParse(req.body)
        if (!createData.success) {
            return res.status(400).send('Body not match')
        }
        const chat = await Chat.findById(createData.data.chatid);
        if (chat) {
            const msg = await Message.create({
                username: createData.data.username,
                content: createData.data.content,
                isNotGPT: createData.data.isNotGPT,
                type: createData.data.type,
                chatid: createData.data.chatid,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            chat.messages.push(msg._id);
            const response = await chat.save();
            return res.status(200).send(response);
        } else {
            return res.status(400).send('Chat not found');
        }
    }
    catch (error) {
        return res.status(500).send(error);
    }
})

export default router
