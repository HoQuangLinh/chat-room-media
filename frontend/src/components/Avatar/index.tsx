import { FC } from 'react'
import AvatarLs from 'react-avatar'
interface IAvatar {
  name: string
  size?: string
  textSizeRatio?: number
}
const Avatar: FC<IAvatar> = (props) => {
  const { name, size, textSizeRatio } = props
  return (
    <AvatarLs
      textSizeRatio={textSizeRatio || 2}
      name={name}
      size={size || '40'}
      round={true}
    />
  )
}

export default Avatar
