import { FC, memo, useContext, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import icons from '@/icons'
import { CustomTooltip } from '@/containers'
import type { AboutProjectProps } from './interface'
import { themeContext } from '@/context'

const TECHNOLOGY_ICON_SIZE = 48

const AboutProject: FC<AboutProjectProps> = ({
  projectTechnologies,
  projectTitle,
  projectDescription,
  repoLink,
}) => {
  const { isDark } = useContext(themeContext)

  const projectTechnologiesElements = useMemo<JSX.Element[]>(
    () =>
      projectTechnologies.map(({ link, image, title }, index) => (
        <li key={index}>
          <CustomTooltip text={title}>
            <Link
              href={link}
              className="flex items-center justify-center"
            >
              <Image
                src={
                  process.env.NEXT_PUBLIC_STRAPI_URL + image.data.attributes.url
                }
                alt={title}
                quality={100}
                priority={false}
                width={TECHNOLOGY_ICON_SIZE}
                height={TECHNOLOGY_ICON_SIZE}
                style={{ filter: isDark ? 'brightness(0) invert(1)' : '' }}
              />
            </Link>
          </CustomTooltip>
        </li>
      )),
    [isDark],
  )

  return (
    <main className="my-24 flex flex-col gap-12">
      <h1 className="text-xl lg:text-2xl xl:text-3xl">{projectTitle}</h1>
      <h3
        className="whitespace-pre-line text-lg"
        dangerouslySetInnerHTML={{ __html: projectDescription }}
      />
      <nav className="flex gap-3 items-center">
        <icons.Github
          width={24}
          height={24}
          className="fill-black"
        />
        <Link href={repoLink}>Repository</Link>
      </nav>
      <ul className="flex flex-row gap-12 flex-wrap items-center">
        <span className="font-semibold text-lg">Project technologies:</span>
        {projectTechnologiesElements}
      </ul>
    </main>
  )
}

export default memo(AboutProject, () => true)
