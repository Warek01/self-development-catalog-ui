import icons from '@/icons'
import AppRoutes from './AppRoutes'

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
    slug: AppRoutes.Resources,
    accessible: true,
  },
  {
    title: 'All categories',
    Icon: icons.List,
    slug: AppRoutes.Categories,
    accessible: true,
  },
  {
    title: 'In development',
    Icon: icons.Hammer,
    slug: AppRoutes.Home,
    accessible: false,
  },
]

export default featuresList
