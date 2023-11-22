import express from 'express'
import chat from "./chat"
import message from './message'
import user from './user'

const router = express.Router()

router.use('/chat', chat)
router.use('/message', message)
router.use('/user', user)

export default router
