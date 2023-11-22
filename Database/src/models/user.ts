import {
  Document,
  Model,
  model,
  Schema,
} from 'mongoose'
import { uuidv4 } from "@firebase/util";


export interface IUser {
  _id: string
  username: string
  password: string
  email: string
  chat_id: string[]
  createdAt: Date
  updatedAt: Date
}

export interface IUserDocument extends IUser, Document {
  _id: string
}

type IUserModel = Model<IUserDocument>
const userSchema = new Schema<IUserDocument, IUserDocument>(
  {
    _id: {
      type: String,
      default: () => uuidv4(),
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    chat_id: {
      type: [String],
      ref: "Chat",
      default: []
    },
    createdAt: {
      type: Date,
      required: true,
    },
    updatedAt: {
      type: Date,
      required: true,
    }
  },
)

export default model<IUserDocument, IUserModel>('User', userSchema)
