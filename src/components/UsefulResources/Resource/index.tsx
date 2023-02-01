import { FC } from 'react'
import Link from 'next/link'

interface Props {
  attribures: UsefulResourceModel
}

const Resource: FC<Props> = ({ attribures }) => {
  const { link, title, description } = attribures

  return (
    <div>
      <header className="">
        <Link href={link}>{title}</Link>
      </header>
      <main>

      </main>
    </div>
  )
}

export default Resource
