import { FormEvent, FormEventHandler, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import MessageItem from '@/components/MessageItem'
import { IMessageResponse } from '@/interfaces/api/Message'
import { useRootSelector } from '@/redux/reducers'
import { messageService } from '@/services/message.service'
import './index.css'
import React from 'react'
import { RiSendPlane2Fill } from 'react-icons/ri'

const Room = () => {
  const rootSelector = useRootSelector((state) => state)
  const { user } = rootSelector!

  const dispatch = useDispatch()

  const { roomId } = useParams()
  console.log(roomId)
  const [text, setText] = useState('')
  const [media, setMedia] = useState([])

  const refDisplay = useRef<any>()

  const [messages, setMessages] = useState<IMessageResponse[]>([
    {
      _id: 'ss',
      sender: {
        userId: 'slslslsls',
        username: 'linh'
      },
      text: 'Test chat tin '
    },
    {
      _id: 'ss',
      sender: {
        userId: 'slslslsls',
        username: 'linh'
      },
      room: {
        name: 'Linh',
        visibility: 'private',
        _id: 'sksksks'
      },
      text: 'Test chat tin '
    },
    {
      _id: 'ss',
      sender: {
        userId: 'slslslsls',
        username: 'linh'
      },

      text: 'Test chat tin '
    },
    {
      _id: 'ss',
      sender: {
        userId: 'slslslsls',
        username: 'linh'
      },
      room: {
        name: 'Linh',
        visibility: 'private',
        _id: 'sksksks'
      },
      text: 'Test chat tin '
    },
    {
      _id: 'ss',
      sender: {
        userId: 'slslslsls',
        username: 'linh'
      },
      room: {
        name: 'Linh',
        visibility: 'private',
        _id: 'sksksks'
      },
      text: 'Test chat tin '
    },
    {
      _id: 'asss',
      sender: {
        userId: '64ef1d12892c292dce9458f2',
        username: 'linh'
      },
      room: {
        name: 'Linh',
        visibility: 'private',
        _id: 'sksksks'
      },
      text: 'Test chat tin '
    }
  ])

  const navigate = useNavigate()

  useEffect(() => {
    if (!roomId) {
      return
    }
    messageService.getMessageByRoomId(roomId).then((messages) => {
      setMessages(messages)
    })
  }, [roomId])
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    // Your form handling logic here
    event.preventDefault()
    if (!text) {
      return
    }
    if (roomId && text) {
      messageService
        .sendMessage({ text: text, roomId: roomId })
        .then((data) => {
          console.log(data)
          const newMessage = [...messages, data]
          setMessages(newMessage)
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
              {message.sender.userId !== user.userId && (
                <div className='chat_row other_message'>
                  <MessageItem item={message} />
                </div>
              )}

              {message.sender.userId === user.userId && (
                <div className='chat_row you_message'>
                  <MessageItem item={message} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <form
        className='chat_input relative flex items-center justify-between bg-greyCt'
        onSubmit={handleSubmit}
      >
        <input
          type='text'
          placeholder='Send message...'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <RiSendPlane2Fill
          className='absolute right-4'
          cursor={'pointer'}
          color={text ? '#499BA2' : '#fff'}
          fontSize={20}
        />

        {/* <div className='file_upload'>
          <i className='fas fa-image text-red-500' />
          <input type='file' name='file' id='file' multiple accept='image/*' />
        </div> */}
      </form>
    </div>
  )
}

export default Room
