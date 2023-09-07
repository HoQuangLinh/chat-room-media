import { useRootSelector } from '@/redux/reducers'
import peerService from '@/services/peer.service'
import React, { useEffect, useState } from 'react'
import { FcEndCall, FcVideoCall } from 'react-icons/fc'
import Avatar from '../Avatar'
import Modal from '../Modal'
import Video from '../Video'

interface IUserStream {
  username: string
}
interface ICallModalProps {
  isOpen?: boolean
}
interface IUserStream {
  username: string
  stream: MediaStream
}
const CallModal = (props: ICallModalProps) => {
  const [myStream, setMyStreams] = React.useState<IUserStream>()
  const [remoteStreams, setRemoteStreams] = React.useState<IUserStream[]>([])
  const { isOpen } = props

  const [isAnswer, setIsAnswer] = useState(false)
  const peer = peerService.getPeerInstance()
  const rootSelector = useRootSelector((item) => item)
  const { call, user } = rootSelector!
  const { calling } = call!

  useEffect(() => {
    if (user.userId === calling?.sender) {
      openStream(true).then((stream) => {
        setMyStreams({
          username: user.username,
          stream: stream
        })
      })
    }
  }, [calling])

  useEffect(() => {
    peer &&
      peer.on('call', (newCall) => {
        console.log('2')
        openStream(!calling?.isVideo).then((stream) => {
          newCall.answer(stream)
          newCall.on('stream', function (remoteStream) {
            setRemoteStreams((item) => [
              ...item,
              { stream: remoteStream, username: 'Hello' }
            ])
          })
          console.log('123')
          setIsAnswer(true)
        })
      })
    return () => {
      peer && peer.removeListener('call')
    }
  }, [])
  const openStream = (video: boolean) => {
    const config = { audio: true, video: true }
    return navigator.mediaDevices.getUserMedia(config)
  }

  const handleAnswer = () => {
    if (!calling) {
      return
    }

    openStream(calling.isVideo).then((stream) => {
      if (peer && calling.peerId) {
        //get list peers of users
        console.log('test render')
        const newCall = peer.call(calling.peerId, stream)
        newCall.on('stream', function (remoteStream) {
          console.log('test stream')
          setRemoteStreams((item) => [
            ...item,
            {
              stream: remoteStream,
              username: 'Linh'
            }
          ])
        })
      }
    })

    setIsAnswer(true)
  }
  const renderModalCalling = () => {
    return (
      <div className='flex h-full w-full flex-col items-center justify-center text-whiteCt'>
        <Avatar name={'Linh'} size='100' />
        <span className='py-2'>Linh</span>
        <div>From room Test12 is calling...</div>

        <div className='mt-20 flex gap-20'>
          <div className=' cursor-pointer rounded-full border bg-[#EEEE] p-2'>
            <FcEndCall size={50} />
          </div>
          <div
            onClick={handleAnswer}
            className=' cursor-pointer rounded-full border bg-[#EEEE] p-2'
          >
            <FcVideoCall size={50} />
          </div>
        </div>
      </div>
    )
  }
  const renderModalCall = () => {
    return (
      <div className='flex w-full flex-wrap gap-4'>
        {myStream && (
          <div
            key={-1}
            className='relative h-[300px] w-1/2 max-w-[400px] flex-1 rounded-lg bg-[#1e1f22db]  text-whiteCt'
          >
            <div className='absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center'>
              {myStream?.username && (
                <Avatar size='100' name={myStream.username} />
              )}
              {myStream?.username && (
                <p className='py-2'>{myStream.username}</p>
              )}
            </div>
            {myStream?.stream && <Video stream={myStream.stream} />}
          </div>
        )}
        {remoteStreams.map((userStream, index) => {
          return (
            <div
              key={index}
              className='relative h-[300px] w-1/2 max-w-[400px] flex-1 rounded-lg bg-[#1e1f22db]  text-whiteCt'
            >
              <div className='absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center'>
                {userStream?.username && (
                  <Avatar size='100' name={userStream.username} />
                )}
                {userStream?.username && (
                  <p className='py-2'>{userStream.username}</p>
                )}
              </div>
              {userStream?.stream && <Video stream={userStream.stream} />}
            </div>
          )
        })}
      </div>
    )
  }
  console.log({ myStream, remoteStreams })
  return (
    <Modal
      isOpen={isOpen}
      className={`${
        !isAnswer && user.userId !== calling?.sender
          ? 'h-[500px] w-[400px] bg-[#00008b]'
          : 'ml-64 h-screen w-full'
      }`}
      disableCloseClickOutside
    >
      {!isAnswer && user.userId !== calling?.sender && renderModalCalling()}
      {renderModalCall()}
    </Modal>
  )
}

export default CallModal
