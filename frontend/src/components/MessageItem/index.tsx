import { IMessagePayload } from '@/interfaces/api/Message'
import Avatar from '../Avatar'

interface IMessageItemProps {
  item: IMessagePayload
}
const MessageItem = (props: IMessageItemProps) => {
  const { item } = props
  const { text, sender, medias } = item

  return (
    <>
      <div className='you_content flex items-end'>
        <Avatar name={sender.username} />
        <div className=''>
          <p className='ml-4 text-[#fff]'>{sender.username}</p>
          {text && <div className='chat_text ml-2'>{text}</div>}
          {medias && (
            <div className='ml-2 flex flex-wrap gap-4'>
              {medias.map((media) => {
                return <img className='h-48' src={media.url} />
              })}
            </div>
          )}
        </div>
      </div>
      <div className='chat_time'>{new Date().toLocaleString()}</div>
    </>
  )
}

export default MessageItem
