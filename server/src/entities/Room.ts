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
    members: [{ type: mongoose.Types.ObjectId, ref: 'user' }]
  },
  {
    timestamps: true
  }
)

const RoomModel = mongoose.model('room', roomSchema)
export default RoomModel
