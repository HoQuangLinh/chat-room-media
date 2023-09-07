import React, { useEffect, useRef } from 'react'

interface VideoProps {
  stream: MediaStream
}

const Video: React.FC<VideoProps> = ({ stream }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream
    }
  }, [stream])

  return <video className='h-full' ref={videoRef} autoPlay muted />
}

export default Video
