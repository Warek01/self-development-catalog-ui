import { FC, memo } from 'react'

import type { StrapiFindResponse } from '@/types/strapi'
import { LinkIcon } from '@/components/index'
import socialMediaIconsMap from '@/constants/socialMediaIconsMap'
import icons from '@/icons'

export interface Props {
  socialMedias: StrapiFindResponse<SocialMediaModel>
}

const Footer: FC<Props> = ({ socialMedias }) => {
  return (
    <footer className="flex justify-between mt-auto border-t border-black/20 py-4">
      <nav className="flex-col gap-2 hidden md:flex">
        Follow me
        <ul className="flex gap-6">
          {socialMedias.data?.map((link, index) => {
            const Icon =
              socialMediaIconsMap[
                link.attributes.platform as SocialMediaPlatform
              ]

            return (
              <li key={index}>
                <LinkIcon
                  Icon={Icon}
                  size={32}
                  href={link.attributes.link}
                />
              </li>
            )
          })}
        </ul>
      </nav>
      <section className="flex flex-col gap-2">
        <p className="flex flex-col text-lg md:text-2xl font-semibold">
          Dobrojan Alexandru
        </p>
        <p className="flex gap-2 items-center justify-start md:justify-end">
          <LinkIcon
            Icon={icons.Github}
            href="https://github.com/Warek01/self-development-catalog-ui"
            size={24}
          />
          Source code
        </p>
      </section>
    </footer>
  )
}

export default memo(Footer, () => true)
