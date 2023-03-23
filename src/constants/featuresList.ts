import icons from '@/icons'
import AppRoute from './AppRoute'

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
    slug: AppRoute.Resources,
    accessible: true,
  },
  {
    title: 'All categories',
    Icon: icons.List,
    slug: AppRoute.Categories,
    accessible: true,
  },
  {
    title: 'In development',
    Icon: icons.Hammer,
    slug: AppRoute.Home,
    accessible: false,
  },
]

export default featuresList
