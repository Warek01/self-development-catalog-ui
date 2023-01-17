import qs from 'qs';
import axios, { AxiosHeaders, AxiosInstance } from 'axios';

import {
  StrapiFindResponse,
  StrapiPagePropsFields,
  StrapiQuery,
} from 'types/strapi';

export default class ApiFacade {
  private _api: AxiosInstance;

  constructor(
    url: string = process.env.NEXT_PUBLIC_STRAPI_API_URL,
    headers?: AxiosHeaders,
  ) {
    this._api = axios.create({
      headers,
      baseURL: url,
    });
  }

  private async _get<T>(url: string, query?: StrapiQuery): Promise<T> {
    const req = await this._api.get<T>(`${url}?${qs.stringify(query)}`);

    return req.data;
  }

  public async getArticles(
    query?: StrapiQuery,
  ): Promise<StrapiFindResponse<ArticleModel>> {
    return await this._get<StrapiFindResponse<ArticleModel>>(
      '/articles?',
      query,
    );
  }

  public async getArticleCategories(
    query?: StrapiQuery,
  ): Promise<StrapiFindResponse<ArticleCategoryModel>> {
    return await this._get('/article-categories', query);
  }

  public async getPageProps(
    slug: string,
  ): Promise<StrapiPagePropsFields | null> {
    if (slug === '') {
      return null;
    }

    return await this._get<StrapiPagePropsFields>(`/pages-data/${slug}`);
  }
}
