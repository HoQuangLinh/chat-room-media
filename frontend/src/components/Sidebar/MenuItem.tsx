import { keyStorage } from '@/const/keyStorage'
import { IMenuItem } from '@/interfaces/components/ListMenu'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { overrideTailwindClasses } from 'tailwind-override'
interface IMenuItemProps {
  item: IMenuItem
  index?: string
  className?: string
  isChildren?: boolean
  isActive?: boolean
}
const MenuItem: FC<IMenuItemProps> = (props) => {
  const { item, className, isChildren, index, isActive } = props

  const navigate = useNavigate()
  const isHighlightBg = () => {
    const indexSidebarActive = localStorage.getItem(
      keyStorage.indexSidebarActive
    )
    return indexSidebarActive === index
  }

  return (
    <div
      onClick={() => {
        if (item.path) {
          index && localStorage.setItem(keyStorage.indexSidebarActive, index)
          navigate(item.path)
        }
      }}
      className={overrideTailwindClasses(`relative select-none rounded-md px-2 font-semibold 
      ${!item.children && 'cursor-pointer  hover:bg-greyCt'} ${
        isHighlightBg() ? 'bg-blue  ' : ''
      }
      ${isActive ? 'font-black text-whiteCt  ' : 'text-greyLabelCt'}
      ${className} `)}
    >
      <div className='flex w-full items-center'>
        {item.icon && <item.icon className='text-xl' />}
        <div className={`${isChildren ? 'py-2' : 'py-3'} px-2`}>
          {item.title}
        </div>
      </div>

      {item.children && (
        <div className='scroll-ruler ml-4 mb-2 h-96 overflow-auto'>
          {item.children.map((childItem, childIndex) => {
            return (
              <MenuItem
                isActive={childItem.isActive}
                index={`${index} ${childIndex}`}
                isChildren
                item={childItem}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default MenuItem
