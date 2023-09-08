import React, { useEffect, useRef, useState } from 'react'
import { BsFillCameraVideoFill, BsFillCameraVideoOffFill } from 'react-icons/bs'

interface VideoProps {
  stream: MediaStream
  isShowCameraButton?: boolean
  onToggleCameraButton?: (isShow: boolean) => void
}
const Video: React.FC<VideoProps> = ({
  stream,
  isShowCameraButton,
  onToggleCameraButton
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isCameraOn, setIsCameraOn] = useState(true)
  const toggleCamera = () => {
    onToggleCameraButton && onToggleCameraButton(!isCameraOn)
    setIsCameraOn(!isCameraOn)
  }
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = isCameraOn ? stream : null
    }
  }, [stream, isCameraOn])

  return (
    <>
      <video className='h-full' ref={videoRef} autoPlay muted />
      {isShowCameraButton && (
        <button className='absolute top-4 right-4' onClick={toggleCamera}>
          {isCameraOn ? (
            <BsFillCameraVideoFill size={30} />
          ) : (
            <BsFillCameraVideoOffFill size={30} />
          )}
        </button>
      )}
    </>
  )
}

export default Video
