import { injectable } from 'tsyringe'
import {
  ICreateRoomRequestDTO,
  IFormAddMember
} from '../interfaces/dto/RoomDTO'
import RoomModel from '../entities/Room'
import mongoose from 'mongoose'
@injectable()
export default class RoomService {
  async createRoom(
    roomRequestDto: ICreateRoomRequestDTO
  ): Promise<any> {
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
    return newRoom.populate('members', '-password')
  }
  async addMembersToRoom(roomRequestDto: IFormAddMember) {
    const { creator, members, roomId } = roomRequestDto
    if (!roomId || !creator || members.length === 0) {
      throw new Error('data is required')
    }
    const room = await RoomModel.findById(roomId)
    if (!room) {
      throw new Error('room not found')
    }
    room.members.push(...(members as any))
    await room.save()
    return room.populate('members', '-password')
  }
  async getMyOwnerRooms(creator: string) {
    const myOwnerRoom = await RoomModel.find({
      creator: creator
    })
      .populate('members', '-password')
      .sort('-createdAt')
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
      .populate('members', '-password')
      .sort('-createdAt')
    return myOwnerRoom
  }
}
