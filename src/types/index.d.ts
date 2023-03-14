import type { FC, SVGProps } from 'react'
import type { StrapiFindResponse } from '@/types/strapi'

// Globally available types
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_NEXT_PUBLIC_STRAPI_PUBLIC_TOKEN: string
      NEXT_PUBLIC_STRAPI_URL: string
      REVALIDATE_TIMEOUT: string
    }
  }

  type IconComponent = FC<SVGProps<SVGSVGElement>>

  interface LinkProps {
    href: string
    text: string
  }

  type SocialMediaPlatform =
    | 'web'
    | 'facebook'
    | 'discord'
    | 'github'
    | 'gitlab'
    | 'linkedIn'
    | 'instagram'

  type GraphqlResponse<T1 extends string | string[], T2 extends object> = {
    [keys in T1]: StrapiFindResponse<T2>
  }
}

export {}
