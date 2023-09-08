import Input from '@/components/Input'
import MessageItem from '@/components/MessageItem'
import Photo from '@/components/Photo'
import { keySocket } from '@/const/keySocket'
import { IMessageResponse } from '@/interfaces/api/Message'
import { IFormMessage } from '@/interfaces/form/message/Message'
import { useRootSelector } from '@/redux/reducers'
import { createCall } from '@/redux/reducers/call.reducer'
import { messageService } from '@/services/message.service'
import socketService from '@/services/socket.service'
import { uploadToCloudinary } from '@/utils/uploadToCloudinary'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { FcVideoCall } from 'react-icons/fc'
import { RiSendPlane2Fill } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import './index.css'
import { ICallPayload } from '../../interfaces/stores/CallStore'
import peerService from '../../services/peer.service'
const Room = () => {
  const rootSelector = useRootSelector((state) => state)
  const socket = socketService.getSocketInstance()
  const { user, room } = rootSelector!
  const inputRef = useRef<HTMLInputElement>(null)
  const { roomId } = useParams()
  const [files, setFiles] = useState<File[]>([])
  const dispatch = useDispatch()

  const { handleSubmit, control, setValue, watch } = useForm<IFormMessage>({})

  const [messages, setMessages] = useState<IMessageResponse[]>([])

  useEffect(() => {
    if (!roomId) {
      return
    }
    messageService.getMessageByRoomId(roomId).then((messages) => {
      setMessages(messages)
    })
  }, [roomId, room.myRooms])

  const scrollMessageIntoBottom = () => {
    const element = document.getElementById('file_display')
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      })
    }
  }

  const handleCallVideo = async () => {
    if (!roomId) {
      return
    }
    const mePayload: ICallPayload = {
      sender: user.userId,
      roomId: roomId,
      username: user.username,
      isVideo: true
    }

    const socket = socketService.getSocketInstance()
    const peer = peerService.getPeerInstance()
    if (peer?.open) {
      mePayload.peerId = peer.id
    }

    await socket.emit(keySocket.callToRoom, mePayload)
    dispatch(createCall(mePayload))
  }
  useEffect(() => {
    scrollMessageIntoBottom()
  }, [messages, files?.length])

  const onSubmit = handleSubmit(async (data) => {
    if (!data.text?.trim() && (!data.files || data.files.length == 0)) {
      return
    }
    if (data.files) {
      const medias = await uploadToCloudinary(data.files)
      if (medias) {
        data.medias = medias
      }
    }
    if (roomId) {
      messageService
        .sendMessage({ text: data.text, roomId: roomId, medias: data.medias })
        .then(async (data) => {
          socket.emit(keySocket.sendMessageToRoom, {
            sender: user.userId,
            roomId: roomId
          })
          const newMessage = [...messages, data]
          setMessages(newMessage)
          setValue('text', '')
          setValue('files', [])
          setFiles([])
        })
    }
  })
  const handleOpenFile = () => {
    setFiles([])

    if (!!inputRef.current) inputRef.current.click()
  }
  const handleDeleteMedia = (index: number) => {
    const newFiles = [...files].filter((item, id) => id !== index)
    setFiles(newFiles)
  }
  return (
    <div className=''>
      <div id='chat_container' className='chat_container'>
        <div id='chat_display' className='chat_display'>
          {messages.map((message, index) => (
            <div key={index}>
              {message.sender._id !== user.userId && (
                <div className='chat_row other_message'>
                  <MessageItem item={message} />
                </div>
              )}

              {message.sender._id === user.userId && (
                <div className='chat_row you_message'>
                  <MessageItem item={message} />
                </div>
              )}
            </div>
          ))}
        </div>
        <div id='file_display' className=' flex gap-4 bg-[#b27272]'>
          {files &&
            files.length > 0 &&
            files.map((item, index) => {
              return (
                <div className='relative' key={index}>
                  <div className='h-24 w-24'>
                    <img
                      className=' object-cover'
                      src={URL.createObjectURL(item)}
                      alt=''
                    />
                  </div>
                  <div
                    className='absolute -top-2 -right-2 cursor-pointer'
                    onClick={() => handleDeleteMedia(index)}
                  >
                    <AiOutlineCloseCircle size={20} color='#fff' />
                  </div>
                </div>
              )
            })}
        </div>
      </div>

      <div className='flex w-full  '>
        <form
          className='flex flex-1  items-center justify-between gap-4 bg-greyCt px-12'
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onSubmit()
          }}
        >
          <div className='relative flex flex-1 rounded-lg '>
            <Input
              className='w-full rounded-lg  p-2'
              control={control}
              name='text'
            />

            {(watch('text') || watch('files')) && (
              <button type='submit' className='absolute top-0 bottom-0 right-4'>
                <RiSendPlane2Fill
                  className=''
                  cursor={'pointer'}
                  color='#499BA2'
                  fontSize={20}
                />
              </button>
            )}
          </div>
          <button type='button'>
            <Photo
              ref={inputRef}
              name='files'
              control={control}
              type='file'
              onChange={(files) => {
                if (files.length > 0) {
                  setFiles(files)
                }
              }}
              onClick={() => handleOpenFile()}
            />
          </button>

          <button onClick={handleCallVideo} type='button'>
            <FcVideoCall fontSize={40} />
          </button>
        </form>
      </div>
    </div>
  )
}

export default Room
