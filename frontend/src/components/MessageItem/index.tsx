import { IUser } from '@/interfaces/base/User'
import { useRootSelector } from '@/redux/reducers'
import { useDispatch } from 'react-redux'
import Avatar from '../Avatar'
import { IMessagePayload } from '../../interfaces/api/Message'

interface IMessageItemProps {
  item: IMessagePayload
}
const MessageItem = (props: IMessageItemProps) => {
  const rootSelector = useRootSelector((state) => state)
  const { item } = props
  const { text, sender } = item
  const { user: me } = rootSelector!
  const dispatch = useDispatch()

  return (
    <>
      <div className=''>
        <Avatar name={sender.username} />
        <p className='ml-1'>{sender.username}</p>
      </div>

      <div className='you_content'>
        {sender.userId === me.userId && (
          <i className='fas fa-trash text-danger' />
        )}

        <div>{text && <div className='chat_text'>{text}</div>}</div>
      </div>

      <div className='chat_time'>{new Date().toLocaleString()}</div>
    </>
  )
}

export default MessageItem
