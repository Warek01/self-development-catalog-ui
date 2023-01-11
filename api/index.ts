import qs from 'qs';

import {
  StrapiFindOneResponse,
  StrapiFindResponse,
  StrapiPagePropsFields,
  StrapiQuery,
} from 'types/strapi';

export default class ApiFacade {
  constructor(
    public url: string = process.env.NEXT_PUBLIC_STRAPI_API_URL,
    public headers: HeadersInit = {},
  ) {}

  private async _get<T>(url: string): Promise<T> {
    const req = await fetch(this.url + encodeURIComponent(url), {
      headers: this.headers,
    });

    return (await req.json()) as T;
  }

  public async getArticles(
    query?: StrapiQuery,
  ): Promise<StrapiFindResponse<ArticleModel>> {
    return await this._get<StrapiFindResponse<ArticleModel>>(
      'articles?' + qs.stringify(query, { encode: false }),
    );
  }

  public async getPageProps(
    slug: string,
  ): Promise<StrapiPagePropsFields | null> {
    if (slug === '') {
      return null;
    }

    const req = await this._get<StrapiFindOneResponse<StrapiPagePropsFields>>(
      `pages-data/${slug}`,
    );

    if (req.error || !req.data) {
      return null;
    }

    return req.data.attributes;
  }
}
