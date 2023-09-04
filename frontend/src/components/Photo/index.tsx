import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import { AiFillPicture } from 'react-icons/ai'
import { CgClose } from 'react-icons/cg'
import { MdLibraryAdd } from 'react-icons/md'

type TPhoto = {
  onClick: () => void
  name: string
  control: any
  type?: string
}

const Photo = React.forwardRef<HTMLInputElement, TPhoto>((props, ref) => {
  const { name, control, type, onClick } = props
  const [isOpen, setIsOpen] = useState(true)
  const [uploadedFiles, setUpLoadedFiles] = useState<File[]>([])

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsOpen(false)
    setUpLoadedFiles([])
    e.stopPropagation()
  }
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: File[]) => void
  ) => {
    if (event?.target.files) {
      const selectedFile: File[] = Array.from(event?.target.files)
      setUpLoadedFiles((pre) => [...pre, ...selectedFile])
      onChange([...uploadedFiles, ...selectedFile])
    }
  }

  return (
    <>
      {isOpen && (
        <div className='relative '>
          {true ? (
            <>
              <div
                className='relative flex  w-full cursor-pointer flex-col items-center justify-center'
                onClick={onClick}
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
            </>
          ) : (
            <div className='relative'>
              {uploadedFiles.map((file, index) => (
                <div key={index}>
                  <img src={URL.createObjectURL(file)} alt='uploaded' />
                </div>
              ))}
              <div
                className='absolute top-3 left-3 flex cursor-pointer items-center gap-1 bg-bgCt px-3 py-2 text-blackCt filter hover:grayscale'
                onClick={onClick}
              >
                <MdLibraryAdd className='text-xl ' />
                <div className='text-[15px] font-medium'>Add photos/video</div>
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
          )}
        </div>
      )}
    </>
  )
})

export default Photo
