import { useRootSelector } from '@/redux/reducers'
import peerService from '@/services/peer.service'
import {
  FC,
  RefObject,
  createElement,
  useEffect,
  useRef,
  useState
} from 'react'
import { FcEndCall, FcVideoCall } from 'react-icons/fc'
import Avatar from '../Avatar'
import Modal from '../Modal'
import { useSelector } from 'react-redux'
import React from 'react'

interface IUserStream {
  username: string
  video: any
}
interface ICallModalProps {
  isOpen?: boolean
}
const CallModal = (props: ICallModalProps) => {
  const { isOpen } = props
  const [userStreams, setUserStreams] = useState<IUserStream[]>([])
  const videoRefs = useRef<HTMLVideoElement[]>([])

  const [isAnswer, setIsAnswer] = useState(false)
  const peer = peerService.getPeerInstance()
  const rootSelector = useRootSelector((item) => item)
  const { call, user } = rootSelector!
  const { calling } = call!

  useEffect(() => {
    if (user.userId === calling?.sender) {
      openStream(true).then((stream) => {
        console.log('oke pro')
        setUserStreams((item) => [
          {
            username: user.username,
            video: VideoStream(videoRefs.current[0], stream)
          }
        ])
      })
    }
  }, [user, calling])
  console.log(userStreams)
  useEffect(() => {
    peer &&
      peer.on('call', (newCall) => {
        console.log('2')
        openStream(!calling?.isVideo).then((stream) => {
          if (myVideo.current) {
            console.log(stream)
            VideoStream(myVideo.current, stream)
          }
          newCall.answer(stream)
          newCall.on('stream', function (remoteStream) {
            if (otherVideo.current) {
              VideoStream(otherVideo.current, remoteStream)
            }
          })
          console.log('123')
          setIsAnswer(true)
        })
      })
    return () => {
      peer && peer.removeListener('call')
    }
  }, [peer, calling?.isVideo])
  const openStream = (video: boolean) => {
    const config = { audio: true, video }
    return navigator.mediaDevices.getUserMedia(config)
  }
  const myVideo = useRef<HTMLVideoElement>(null)
  const otherVideo = useRef<HTMLVideoElement>(null)
  const VideoStream = (tag: HTMLVideoElement, stream: any) => {
    debugger
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
    }, [stream])

    return <video ref={videoRef} autoPlay playsInline muted controls />
  }
  const handleAnswer = () => {
    if (!calling) {
      return
    }

    openStream(!calling.isVideo).then((stream) => {
      if (myVideo.current) {
        VideoStream(myVideo.current, stream)
        if (peer && calling.peerId) {
          //get list peers of users
          const newCall = peer.call(calling.peerId, stream)
          newCall.on('stream', function (remoteStream) {
            if (otherVideo.current) {
              VideoStream(otherVideo.current, remoteStream)
            }
          })
        }
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
      <div
        className='flex w-full flex-wrap gap-4'
        // style={{
        //   opacity: !isAnswer && user.userId !== calling?.sender ? 0 : 1
        // }}
      >
        {userStreams.map((user, index) => {
          return (
            <div className='relative h-[300px] w-1/2 flex-1 rounded-lg bg-[#1e1f22db] p-4 text-whiteCt'>
              <div className='absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center'>
                <Avatar size='100' name={user.username} />
                <p className='py-2'>{user.username}</p>
              </div>
              {user.video}
              {/* <video ref={user.video} className='h-full'  playsInline muted /> */}
            </div>
          )
        })}

        {/* <div className='relative h-[300px] w-1/2 flex-1 rounded-lg bg-[#1e1f22db] p-4 text-whiteCt'>
          <div className='absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center'>
            <Avatar size='100' name='Linh' />
            <p className='py-2'>Linh</p>
          </div>
          <video ref={otherVideo} playsInline />
        </div> */}
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
      {renderModalCall()}
    </Modal>
  )
}

export default CallModal
