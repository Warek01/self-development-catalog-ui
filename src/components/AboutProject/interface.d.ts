import { StrapiMultimediaModel } from '@/types/strapi'

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
