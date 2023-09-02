import { FC } from 'react'
import AvatarLs from 'react-avatar'
interface IAvatar {
  name: string
  size?: string
}
const Avatar: FC<IAvatar> = (props) => {
  const { name, size } = props
  return <AvatarLs name={name} size={size || '40'} round={true} />
}

export default Avatar
