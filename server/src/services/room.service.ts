import { injectable } from 'tsyringe'
import { ICreateRoomRequestDTO } from '../interfaces/dto/RoomDTO'
import RoomModel from '../entities/Room'
@injectable()
export default class RoomService {
  async createRoom(
    roomRequestDto: ICreateRoomRequestDTO
  ): Promise<boolean> {
    const { name, creator, visibility, members } = roomRequestDto
    if (!name || !creator) {
      throw new Error('name and creator is required')
    }
    const newRoom = new RoomModel({
      name: name,
      creator: creator,
      visibility: visibility,
      members: members
    })
    await newRoom.save()
    return true
  }
  async getMyOwnerRooms(creator: string) {
    const myOwnerRoom = await RoomModel.find({
      creator: creator
    })
    return myOwnerRoom
  }
  async getMyRooms(me: string) {
    const myOwnerRoom = await RoomModel.find({
      $or: [
        {
          creator: me
        },
        { members: { $in: [me] } }
      ]
    })
    return myOwnerRoom
  }
}
