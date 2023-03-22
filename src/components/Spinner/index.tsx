import { FC } from 'react'

import icons from '@/icons'
import style from './style.module.sass'

interface Props {
  size?: number
}

const Spinner: FC<Props> = ({ size = 36 }) => {
  return (
    <icons.Spinner
      className={style.spinner}
      width={size}
      height={size}
    />
  )
}

export default Spinner
