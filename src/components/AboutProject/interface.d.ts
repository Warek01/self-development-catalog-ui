import type { StrapiMultimediaModel } from '@/types/models'

export interface AboutProjectProps {
  projectTitle: string
  projectDescription: string
  projectTechnologies: {
    link: string
    title: string
    image: StrapiMultimediaModel
  }[]
  repoLink: string
}
