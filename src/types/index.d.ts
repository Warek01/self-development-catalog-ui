import type { FC, SVGProps } from 'react'

// Globally available types
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      STRAPI_PUBLIC_TOKEN: string
      NEXT_PUBLIC_STRAPI_URL: string
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
}

export {}
