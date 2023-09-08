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
  const [isShowMyCamera, setIsShowMyCamera] = useState(true)

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
        openStream(!calling?.isVideo).then((stream) => {
          newCall.answer(stream)
          newCall.on('stream', function (remoteStream) {
            const userRemotes = [
              ...remoteStreams,
              {
                stream: remoteStream,
                username: newCall.metadata
              }
            ].filter((user, index, self) => {
              return (
                self.findIndex((u) => u.username === user.username) === index
              )
            })
            setRemoteStreams([...userRemotes])
          })
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
      setMyStreams({
        stream: stream,
        username: user.username
      })
      if (peer && calling.peerInfos) {
        const myPeerId = peerService.getPeerInstance()?.id
        calling.peerInfos
          .filter((peer) => peer.peerId !== myPeerId)
          .forEach((item) => {
            const newCall = peer.call(item.peerId, stream, {
              metadata: user.username
            })

            newCall.on('stream', function (remoteStream) {
              const userRemotes = [
                ...remoteStreams,
                {
                  stream: remoteStream,
                  username: item.username
                }
              ].filter((user, index, self) => {
                return (
                  self.findIndex((u) => u.username === user.username) === index
                )
              })
              setRemoteStreams(userRemotes)
            })
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
            <div
              className={
                isShowMyCamera
                  ? 'absolute top-4 left-4 flex items-center gap-2'
                  : `absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center`
              }
            >
              {myStream?.username && (
                <Avatar
                  textSizeRatio={isShowMyCamera ? 2 : 1.5}
                  size={isShowMyCamera ? '60' : '100'}
                  name={myStream.username}
                />
              )}
              {myStream?.username && (
                <p className='py-2 text-xl'>{myStream.username}</p>
              )}
            </div>
            {myStream?.stream && (
              <Video
                isShowCameraButton
                onToggleCameraButton={(data) => {
                  setIsShowMyCamera(data)
                }}
                stream={myStream.stream}
              />
            )}
          </div>
        )}
        {remoteStreams.map((userStream, index) => {
          return (
            <div
              key={index}
              className='relative h-[300px] w-1/2 max-w-[400px] flex-1 rounded-lg bg-[#1e1f22db]  text-whiteCt'
            >
              <div className='absolute top-4 left-4 flex items-center gap-2'>
                {userStream?.username && (
                  <Avatar
                    textSizeRatio={2}
                    size='60'
                    name={userStream.username}
                  />
                )}
                {userStream?.username && (
                  <p className='py-2 text-xl'>{userStream.username}</p>
                )}
              </div>
              {userStream?.stream && <Video stream={userStream.stream} />}
            </div>
          )
        })}
      </div>
    )
  }

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
      {(isAnswer || user.userId === calling?.sender) && renderModalCall()}
    </Modal>
  )
}

export default CallModal
