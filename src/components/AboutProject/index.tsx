import { FC } from 'react'

interface Props {
  projectTitle: string
  projectDescription: string
  projectTechnologies: unknown
  repoLink: string
}

const AboutProject: FC<Props> = ({
  projectTechnologies,
  projectTitle,
  projectDescription,
  repoLink,
}) => {
  return (
    <main className="my-24">
      <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl">
        {projectTitle}
      </h1>
    </main>
  )
}

export default AboutProject
