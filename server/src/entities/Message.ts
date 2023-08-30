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

module.exports = mongoose.model('message', messageSchema)
