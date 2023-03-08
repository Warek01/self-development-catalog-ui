import { FC, memo } from 'react'
import Head from 'next/head'

const Seo: FC<Partial<PageSeoModel>> = (props) => {

  if (!props?.data) {
    return null
  }

  const { title, image, description, robots, preventIndexing, link } =
    props.data

  return (
    <Head>
      <title>{title}</title>
      <meta
        name="twitter:title"
        content={title}
      />
      <meta
        name="title"
        property="og:title"
        content={title}
      />
      <meta
        name="og:type"
        content="website"
      />
      <meta
        name="type"
        property="og:type"
        content="website"
      />
      <meta
        name="twitter:card"
        content="website"
      />
      <meta
        name="description"
        content={description}
      />
      <meta
        name="description"
        property="og:description"
        content={description}
      />
      <meta
        name="twitter:description"
        content={description}
      />
      <meta
        name="twitter:url"
        content={link}
      />
      <meta
        name="og:url"
        content={link}
      />

      {image?.media ? (
        <>
          <meta
            name="twitter:image"
            content={
              process.env.NEXT_PUBLIC_STRAPI_URL +
              image.media.data.attributes.url
            }
          />
          <meta
            property="og:image"
            content={
              process.env.NEXT_PUBLIC_STRAPI_URL +
              image.media.data.attributes.url
            }
          />
          <meta
            name="image"
            content={
              process.env.NEXT_PUBLIC_STRAPI_URL +
              image.media.data.attributes.url
            }
          />
          <meta
            property="og:image:secure_url"
            content={
              process.env.NEXT_PUBLIC_STRAPI_URL +
              image.media.data.attributes.url
            }
          />
        </>
      ) : null}

      <meta
        name="robots"
        content={robots}
      />

      {preventIndexing && !robots.includes('noindex') && (
        <>
          <meta
            name="robots"
            content="noindex"
          />
          <meta
            name="googlebot"
            content="noindex"
          />
        </>
      )}
    </Head>
  )
}

export default memo(Seo, () => true)
