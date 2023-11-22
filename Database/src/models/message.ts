import { Document, model, Schema } from 'mongoose'
import { uuidv4 } from "@firebase/util";

export interface IMessage {
    _id: string;
    username: string;
    content: string ;
    isNotGPT: boolean;
    type: 'text';
    createdAt: Date;
    updatedAt: Date;
}

export interface IMessageDocument extends IMessage, Document {
  _id: string
}

const messageSchema = new Schema<IMessageDocument, IMessageDocument>({
  _id: {
    type: String,
    default: () => uuidv4(),
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  isNotGPT: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
})

export default model<IMessageDocument>('Message', messageSchema)
