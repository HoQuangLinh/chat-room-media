import { useEffect, useRef, useState } from 'react'
import { FcEndCall, FcVideoCall } from 'react-icons/fc'
import { useRootSelector } from '../../redux/reducers'
import Avatar from '../Avatar'
import Modal from '../Modal'
import peerService from '../../services/peer.service'

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
    peer &&
      peer.on('call', (newCall) => {
        openStream(!!calling?.isVideo).then((stream) => {
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
    openStream(!!calling.isVideo).then((stream) => {
      if (myVideo.current) {
        playStream(myVideo.current, stream)
        if (peer && calling.peerId) {
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
      <Modal
        isOpen={isOpen}
        className='h-[500px] w-[400px] bg-[#00008b]'
        disableCloseClickOutside
      >
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
      </Modal>
    )
  }
  const renderModalCall = () => {
    return (
      <>
        <video
          ref={myVideo}
          className='h-[400px] w-[400px]'
          playsInline
          muted
        />
        <video ref={otherVideo} className=' h-[400px] w-[400px]' playsInline />
      </>
    )
  }

  return isAnswer ? renderModalCall() : renderModalCalling()
}

export default CallModal
