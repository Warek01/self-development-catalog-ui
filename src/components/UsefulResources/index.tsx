import { FC } from 'react'

import type { StrapiFindResponse } from 'types/strapi'
import Resource from './Resource'

interface Props {
  resources: StrapiFindResponse<UsefulResourceModel>
}

const UsefulResources: FC<Props> = ({ resources }) => {
  return (
    <div className="my-12">
      <header className="text-2xl font-semibold">Useful resources</header>
      <main className="">
        <ul className="flex flex-col gap-6">
          {resources.data.map((resource) => (
            <li key={resource.id}>
              <Resource attribures={resource.attributes} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default UsefulResources
