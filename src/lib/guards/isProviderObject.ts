import { ProviderObject } from '@/containers/ComposedProvider/interface'

const isProviderObject = (provider: unknown): provider is ProviderObject =>
  typeof provider === 'object' &&
  'Component' in provider! &&
  typeof provider['Component'] === 'function'

export default isProviderObject
