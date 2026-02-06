import { model, Schema } from "mongoose";

const conversationSchema = new Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    lastMessage: String,
    lastMessageTime: Date,
  },
  {
    timestamps: true,
  }
);

export default model('Conversation', conversationSchema);
