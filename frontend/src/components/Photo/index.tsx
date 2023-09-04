import React, { MouseEvent, useState } from 'react'
import { Controller } from 'react-hook-form'
import { AiFillPicture } from 'react-icons/ai'

type TPhoto = {
  onClick: (event: MouseEvent) => void
  name: string
  control: any
  type?: string

  onChange?: (files: File[]) => void
}

const Photo = React.forwardRef<HTMLInputElement, TPhoto>((props, ref) => {
  const { name, control, type, onClick, onChange } = props
  const [uploadedFiles, setUpLoadedFiles] = useState<File[]>([])

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChangeFun: (value: File[]) => void
  ) => {
    if (event?.target.files) {
      const selectedFile: File[] = Array.from(event?.target.files)
      setUpLoadedFiles((pre) => [...pre, ...selectedFile])
      const newFiles = [...uploadedFiles, ...selectedFile]
      onChangeFun(newFiles)
      onChange && onChange(newFiles)
    }
  }

  return (
    <div className='relative '>
      <div
        className='relative flex  w-full cursor-pointer flex-col items-center justify-center'
        onClick={(e) => {
          setUpLoadedFiles([])
          onClick(e)
        }}
      >
        <div className='flex  items-center justify-center  '>
          <button>
            <AiFillPicture fontSize={30} color='#499be8' />
          </button>
        </div>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange } }) => (
            <input
              id={name}
              ref={ref}
              onChange={(event) => handleChange(event, onChange)}
              type={type}
              multiple
              accept='image/jpeg, image/png, video/mp4'
              className='hidden'
            />
          )}
        />
      </div>
    </div>
  )
})

export default Photo
