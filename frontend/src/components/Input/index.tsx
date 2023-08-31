import React from 'react'
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions
} from 'react-hook-form'

interface IOption {
  value: string
  label: string
}

interface InputProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  type?: 'text' | 'password' | 'radio' | 'textarea'
  label?: string
  placeholder?: string
  error?: string
  options?: IOption[]
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
}
type TInputElement = {
  onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
  value: string
}
const Input = <T extends FieldValues>(props: InputProps<T>) => {
  const {
    name,
    control,
    type = 'text',
    label,
    placeholder,
    error,
    options,
    rules,
    onChange
  } = props

  const renderInputElement = (inputProps: TInputElement) => {
    switch (type) {
      case 'radio':
        return (
          <div className='flex items-center '>
            {options?.map((option, index) => (
              <div className='ml-4' key={option.value}>
                <input
                  type='radio'
                  id={`${name}-${option.value}`}
                  {...inputProps}
                  value={option.value}
                  onChange={(e) => {
                    onChange && onChange(e)
                    inputProps.onChange(e)
                  }}
                  checked={option.value === inputProps.value || index === 0}
                />
                <label
                  htmlFor={`${name}-${option.value}`}
                  className='ml-2 text-whiteCt'
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        )
      case 'textarea':
        return (
          <textarea
            id={name}
            {...inputProps}
            placeholder={placeholder}
            className='w-full bg-blackBgCt p-[10px] text-whiteCt'
          />
        )
      default:
        return (
          <input
            id={name}
            {...inputProps}
            onChange={(e) => {
              onChange && onChange(e)
              inputProps.onChange(e)
            }}
            type={type}
            placeholder={placeholder}
            className='w-full rounded-[3px] bg-blackCt p-[10px] text-whiteCt'
          />
        )
    }
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <div className='block'>
          {label && (
            <div className='mt-4 mb-2 flex justify-between text-xs font-bold uppercase'>
              <label htmlFor={name} className='text-greyLabelCt'>
                {label}
              </label>
            </div>
          )}
          {renderInputElement(field)}
          {error && <span className='text-[15px] text-redCt'>{error}</span>}
        </div>
      )}
    />
  )
}

export default Input
