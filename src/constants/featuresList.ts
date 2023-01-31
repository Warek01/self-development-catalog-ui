import { icons } from 'components'
import AppRoutes from './appRoutes'

interface Feature {
  Icon: IconComponent
  title: string
  slug: string
  accessible: boolean
}

const featuresList: Feature[] = [
  {
    title: 'Useful resources',
    Icon: icons.List,
    slug: AppRoutes.resources,
    accessible: true,
  },
  {
    title: 'In development',
    Icon: icons.Hammer,
    slug: AppRoutes.home,
    accessible: false,
  },
  {
    title: 'In development',
    Icon: icons.Hammer,
    slug: AppRoutes.home,
    accessible: false,
  },
]

export default featuresList
