import MessageItem from '@/components/MessageItem'
import { keySocket } from '@/const/keySocket'
import { IMessageResponse } from '@/interfaces/api/Message'
import { useRootSelector } from '@/redux/reducers'
import { messageService } from '@/services/message.service'
import socketService from '@/services/socket.service'
import { FormEventHandler, useEffect, useRef, useState } from 'react'
import { RiSendPlane2Fill } from 'react-icons/ri'
import { useParams } from 'react-router-dom'
import './index.css'
import { FcVideoCall } from 'react-icons/fc'
import { AiFillPicture } from 'react-icons/ai'
const Room = () => {
  const rootSelector = useRootSelector((state) => state)
  const socket = socketService.getSocketInstance()
  const { user, room } = rootSelector!

  const { roomId } = useParams()
  const [text, setText] = useState('')
  const [media, setMedia] = useState([])

  const refDisplay = useRef<any>()

  const [messages, setMessages] = useState<IMessageResponse[]>([])

  useEffect(() => {
    if (!roomId) {
      return
    }
    messageService.getMessageByRoomId(roomId).then((messages) => {
      setMessages(messages)
    })
  }, [roomId, room.myRooms])
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    if (!text) {
      return
    }
    if (roomId && text) {
      messageService
        .sendMessage({ text: text, roomId: roomId })
        .then((data) => {
          socket.emit(keySocket.sendMessageToRoom, {
            sender: user.userId,
            roomId: roomId
          })
          console.log(data)
          const newMessage = [...messages, data]
          setMessages(newMessage)
          setText('')
        })
    }
  }

  return (
    <div className='m-2'>
      <div
        className='message_header'
        style={{
          cursor: 'pointer',
          boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'
        }}
      ></div>

      <div
        className='chat_container'
        style={{ height: media.length > 0 ? 'calc(100% - 180px)' : '' }}
      >
        <div className='chat_display' ref={refDisplay}>
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
      </div>

      <div className='flex w-full gap-4 px-12'>
        <form
          className='chat_input relative flex flex-1 items-center justify-between bg-greyCt'
          onSubmit={handleSubmit}
        >
          <input
            type='text'
            placeholder='Send message...'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type='submit' className='absolute right-4'>
            <RiSendPlane2Fill
              className=''
              cursor={'pointer'}
              color={text ? '#499BA2' : '#fff'}
              fontSize={20}
            />
          </button>

          {/* <div className='file_upload'>
          <i className='fas fa-image text-red-500' />
          <input type='file' name='file' id='file' multiple accept='image/*' />
        </div> */}
        </form>
        <button type='button'>
          <FcVideoCall fontSize={40} />
        </button>
        <button>
          <AiFillPicture fontSize={30} color='#499be8' />
        </button>
      </div>
    </div>
  )
}

export default Room
