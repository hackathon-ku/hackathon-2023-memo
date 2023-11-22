import express, { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import chalk from 'chalk'
import ms from 'ms'

dotenv.config()

const MAX_RETRIES = 10
let retries = 0

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  // autoReconnect: true
}
const connectWithRetry = () => {
  return mongoose
    .connect(process.env.DATABASE_URL || '', options)
    .then(() => {
      console.log(chalk.greenBright('✔ Connected to database ✔'))
    })
    .catch((err) => {
      console.error(chalk.redBright('✖ Failed to connect to database:'), err)
      if (retries < MAX_RETRIES) {
        retries++
        const delay = ms('5s')
        console.warn(
          chalk.yellow(
            `⏳ Retry in ${delay / 1000}s... (${retries}/${MAX_RETRIES})`,
          ),
        )
        setTimeout(connectWithRetry, delay)
      } else {
        console.error(chalk.bgRed('✖ Max retries reached. Exiting.'))
        process.exit(1)
      }
    })
}

connectWithRetry()

const app = express();
const port = Number(process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.send('Hello, Express with TypeScript!');
});

// app.use('/', router)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});