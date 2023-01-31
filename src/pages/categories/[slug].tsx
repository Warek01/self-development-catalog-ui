import { FC } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'

import { apolloSsrClient } from 'utils/gql/client'
import {
  GET_CATEGORY,
  GET_CATEGORY_SLUGS,
  GetCategoryQueryReturn,
  GetCategorySlugsQueryResult,
} from 'utils/gql/articles'

interface Props {
  category?: ArticleCategoryModel
}

interface Params extends Record<string, string> {
  slug: string
}

const Category: FC<Props> = ({ category }) => {
  if (!category) {
    return <div>Not found</div>
  }

  return <div>{category.title}</div>
}

export default Category

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const slug = params!.slug
  const category = await apolloSsrClient.query<GetCategoryQueryReturn>({
    query: GET_CATEGORY,
    variables: {
      categorySlug: slug,
    },
  })

  return {
    props: {
      category: category.data.articleCategories.data[0]?.attributes || null,
    },
  }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const slugs = await apolloSsrClient.query<GetCategorySlugsQueryResult>({
    query: GET_CATEGORY_SLUGS,
  })

  return {
    paths: slugs.data!.articleCategories.data.map(({ attributes }) => ({
      params: { slug: attributes.slug },
    })),
    fallback: 'blocking',
  }
}
