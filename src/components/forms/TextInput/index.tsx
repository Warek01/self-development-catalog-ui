import { ChangeEventHandler, forwardRef } from 'react'

interface Props {
  name: string
  password?: boolean
  placeholder?: string
  autoComplete?: boolean
  className?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
}

const TextInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      placeholder,
      name,
      className,
      autoComplete = true,
      password = false,
      onChange,
    },
    ref,
  ) => {
    return (
      <input
        type={password ? 'password' : 'text'}
        ref={ref}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        id={name}
        autoComplete={autoComplete ? 'true' : 'false'}
        className={`
          bg-transparent dark:bg-transparent rounded-full border border-black/20 dark:border-dark-white/20
          py-2 px-4
          ${className}
        `}
      />
    )
  },
)

export default TextInput
