import { pageDataDocument } from '@/graphql'
import { apolloSsrClient } from '@/graphql/client'
import type {
  PageDataModel,
  PageSeoModel,
  SocialMediaModel,
  StrapiFindOneResponse,
  StrapiFindResponse,
} from '@/types/models'

interface PageDataQueryResponse<T> {
  pages: {
    data: {
      attributes: {
        seo: StrapiFindOneResponse<PageSeoModel>
        props: T[]
      }
    }[]
  }
  socialMedias: StrapiFindResponse<SocialMediaModel>
}

const getPageData = async <T>(slug: string): Promise<PageDataModel<T>> => {
  const pageDataQuery = await apolloSsrClient.query<PageDataQueryResponse<T>>({
    query: pageDataDocument.FindPageData,
    variables: {
      slug,
    },
  })

  return {
    props: (pageDataQuery.data?.pages?.data?.at(0)?.attributes.props.at(0) || null)!, // || null in case T == null (props not expected)
    seo: pageDataQuery.data?.pages?.data?.at(0)?.attributes.seo.data.attributes || null,
    socialMedias: pageDataQuery.data.socialMedias,
  }
}

export default getPageData
