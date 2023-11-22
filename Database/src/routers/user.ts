import express from "express";
import { createSchema, GetSchema } from "../schemas/user";
import User from "../models/user";
import { async } from "@firebase/util";
import Chat from "../models/chat";
import chat from "../models/chat";
const bcrypt = require('bcrypt');

const router = express.Router();

router.post("/create", (req, res) => {
  let saltRounds: number = 8;
  try {
    const createData = createSchema.safeParse(req.body)
    if (!createData.success) {
      return res.status(400).send('Body not match')
    }
    bcrypt.hash(createData.data.password, saltRounds, async function(err: any, hash: any) {
      const response = await User.create({
        username: createData.data.username,
        password: hash,
        email: createData.data.email,
        createadAt: new Date(),
        updatedAt: new Date(),
      })
      return res.status(200).send(response);
    });
    
  }
  catch (error) {
    return res.status(500).send(error);
  }
})

router.post("/get", async (req, res) => {
  try {
    const getData = GetSchema.safeParse(req.body)
    if (!getData.success) {
      return res.status(400).send('Body not match')
    }
    const user = await User.findOne({
      username: getData.data.username,
    })
    if (user) {
      bcrypt.compare(getData.data.password, user.password, async function(err: any, result: any) {
        if (result) {
          const chatlist = user.chat_id.map(async (chat_id) => {
            const chat = await Chat.findById(chat_id);
            return chat ? {[chat_id] : chat.name} : null; 
          })
          return res.status(200).send(chatlist);
        } else {
          return res.status(400).send('Password not match');
        }
      });
    } else {
      return res.status(400).send('User not found');
    }
  }
  catch (error) {
    return res.status(500).send(error);
  }
})

export default router;