import mongoose from 'mongoose'
const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String
    },
    sender: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: true
    },

    medias: {
      type: Array
    },
    room: {
      type: mongoose.Types.ObjectId,
      ref: 'room',
      required: true
    }
  },
  {
    timestamps: true
  }
)

const MessageModel = mongoose.model('message', messageSchema)
export default MessageModel
