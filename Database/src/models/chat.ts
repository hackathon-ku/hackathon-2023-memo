import {
  Document,
  Model,
  model,
  Schema,
} from "mongoose";
import { uuidv4 } from "@firebase/util";

export interface IChat {
  _id: string;
  name: string;
  messages: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface IChatDocument extends IChat, Document {
  _id: string;
}

type IChatModel = Model<IChatDocument>;
const chatSchema = new Schema<IChatDocument, IChatDocument>(
  {
    _id: {
      type: String,
      default: () => uuidv4(),
    },
    name: {
      type: String,
      required: true,
    },
    messages: {
      type: [String],
      ref: "Message",
      default: [],
    },
    createdAt: {
      type: Date,
      required: true,
    },
    updatedAt: {
      type: Date,
      required: true,
    },
  },
);

export default model<IChatDocument, IChatModel>("Chat", chatSchema);
