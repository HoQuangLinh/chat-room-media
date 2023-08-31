import mongoose from 'mongoose'
const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: true
    },
    visibility: {
      type: String,
      enum: ['public', 'private'],
      default: 'public'
    },
    sendingRequests: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    receiveRequests: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    avatar: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('room', roomSchema)
