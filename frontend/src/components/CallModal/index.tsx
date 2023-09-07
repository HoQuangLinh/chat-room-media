import { useRootSelector } from '@/redux/reducers'
import peerService from '@/services/peer.service'
import { useEffect, useRef, useState } from 'react'
import { FcEndCall, FcVideoCall } from 'react-icons/fc'
import Avatar from '../Avatar'
import Modal from '../Modal'

interface ICallModalProps {
  isOpen?: boolean
}
const CallModal = (props: ICallModalProps) => {
  const { isOpen } = props

  const [isAnswer, setIsAnswer] = useState(false)
  const peer = peerService.getPeerInstance()
  const callSelector = useRootSelector((item) => item.call)
  const { calling } = callSelector!
  useEffect(() => {
    console.log('1')
    peer &&
      peer.on('call', (newCall) => {
        console.log('2')
        openStream(!calling?.isVideo).then((stream) => {
          if (myVideo.current) {
            console.log(stream)
            playStream(myVideo.current, stream)
          }
          newCall.answer(stream)
          newCall.on('stream', function (remoteStream) {
            if (otherVideo.current) {
              playStream(otherVideo.current, remoteStream)
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
  const playStream = (tag: HTMLVideoElement, stream: any) => {
    let video = tag
    video.srcObject = stream
    video.play()
  }
  const handleAnswer = () => {
    if (!calling) {
      return
    }

    openStream(!calling.isVideo).then((stream) => {
      if (myVideo.current) {
        playStream(myVideo.current, stream)
        if (peer && calling.peerId) {
          //get list peers of users
          const newCall = peer.call(calling.peerId, stream)
          newCall.on('stream', function (remoteStream) {
            if (otherVideo.current) {
              playStream(otherVideo.current, remoteStream)
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
        style={{ opacity: !isAnswer ? 0 : 1 }}
      >
        <div className='relative h-[300px] w-1/2 flex-1 rounded-lg bg-[#1e1f22db] p-4 text-whiteCt'>
          <div className='absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center'>
            <Avatar size='100' name='Linh' />
            <p className='py-2'>Linh</p>
          </div>
          <video className='h-full' ref={myVideo} playsInline muted />
        </div>
        <div className='relative h-[300px] w-1/2 flex-1 rounded-lg bg-[#1e1f22db] p-4 text-whiteCt'>
          <div className='absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center'>
            <Avatar size='100' name='Linh' />
            <p className='py-2'>Linh</p>
          </div>
          <video ref={otherVideo} playsInline />
        </div>
      </div>
    )
  }

  return (
    <Modal
      isOpen={isOpen}
      className={`${
        !isAnswer ? 'h-[500px] w-[400px] bg-[#00008b]' : 'ml-64 h-screen w-full'
      }`}
      disableCloseClickOutside
    >
      {!isAnswer && renderModalCalling()}
      {renderModalCall()}
    </Modal>
  )
}

export default CallModal
