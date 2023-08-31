import { IMenuItem } from '@/interfaces/ListMenu'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
interface IMenuItemProps {
  item: IMenuItem
  className?: string
  isChildren?: boolean
}
const MenuItem: FC<IMenuItemProps> = (props) => {
  const { item, className, isChildren } = props
  const navigate = useNavigate()
  return (
    <div
      onClick={() => {
        if (item.path) {
          navigate(item.path)
        }
      }}
      //   to={item.path || ''}
      className={`relative flex w-full  items-center rounded-md px-2 font-semibold ${
        !item.children && ' cursor-pointer hover:bg-greyCt'
      } ${
        item.title === 'Home' ? 'text-whiteCt' : 'text-greyLabelCt'
      } ${className} `}
    >
      {item.icon && <item.icon className='text-xl' />}
      <div className={`${isChildren ? 'py-2' : 'py-3'} px-2`}>{item.title}</div>
      {item.children && (
        <div className='absolute top-10 left-8 mb-2 '>
          {item.children.map((childItem) => {
            return <MenuItem isChildren item={childItem} />
          })}
        </div>
      )}
    </div>
  )
}

export default MenuItem
