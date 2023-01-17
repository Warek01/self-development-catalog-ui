import qs from 'qs';

import {
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
    const req = await fetch(this.url + url, {
      headers: this.headers,
    });

    return (await req.json()) as T;
  }

  public async getArticles(
    query?: StrapiQuery,
  ): Promise<StrapiFindResponse<ArticleModel>> {
    return await this._get<StrapiFindResponse<ArticleModel>>(
      'articles?' + qs.stringify(query),
    );
  }

  public async getPageProps(
    slug: string,
  ): Promise<StrapiPagePropsFields | null> {
    if (slug === '') {
      return null;
    }

    return await this._get<StrapiPagePropsFields>(`pages-data/${slug}`);
  }
}
