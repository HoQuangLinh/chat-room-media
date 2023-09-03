import { IMessagePayload } from '@/interfaces/api/Message'
import { useRootSelector } from '@/redux/reducers'
import { useDispatch } from 'react-redux'
import Avatar from '../Avatar'

interface IMessageItemProps {
  item: IMessagePayload
}
const MessageItem = (props: IMessageItemProps) => {
  const rootSelector = useRootSelector((state) => state)
  const { item } = props
  const { text, sender } = item
  const dispatch = useDispatch()

  return (
    <>
      <div className=''></div>

      <div className='you_content flex items-end'>
        <Avatar name={sender.username} />
        <div className=''>
          <p className='ml-4 text-[#fff]'>{sender.username}</p>
          {text && <div className='chat_text ml-2'>{text}</div>}
        </div>
      </div>

      <div className='chat_time'>{new Date().toLocaleString()}</div>
    </>
  )
}

export default MessageItem
