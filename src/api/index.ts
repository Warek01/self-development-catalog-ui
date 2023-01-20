import qs from 'qs';
import axios, { AxiosHeaders, AxiosInstance } from 'axios';

import type {
  StrapiFindOneResponse,
  StrapiFindResponse,
  StrapiPagePropsFields,
  StrapiQuery,
} from 'types/strapi';
import type { AboutPageStrapiProps } from 'pages/about/interface';
import type { HomePageStaticProps } from 'pages/interface';
import { AppLayoutProps } from '../components/AppLayout/interface';

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

  public readonly articles = {
    getAll: async (
      query?: StrapiQuery,
    ): Promise<StrapiFindResponse<ArticleModel>> => {
      return await this.get<ArticleModel>('/articles?', query);
    },

    getAllCategories: async (
      query?: StrapiQuery,
    ): Promise<StrapiFindResponse<ArticleCategoryModel>> => {
      return await this.get<ArticleCategoryModel>('/article-categories', query);
    },
  };

  public readonly singleTypes = {
    getAboutPageProps: async (): Promise<AboutPageStrapiProps> => {
      const req = await this.getOne<AboutPageStrapiProps>('/about');

      return req.data.attributes;
    },

    getHomePageProps: async (): Promise<HomePageStaticProps> => {
      const req = await this.getOne<HomePageStaticProps>('/home', ['welcomeImage']);

      return req.data.attributes;
    },
  };

  public async get<T>(
    url: string,
    query?: StrapiQuery,
  ): Promise<StrapiFindResponse<T>> {
    const req = await this._api.get<StrapiFindResponse<T>>(
      `${url}?${qs.stringify(query)}`,
    );

    return req.data;
  }

  public async getOne<T>(
    url: string,
    populate: string[] = [],
  ): Promise<StrapiFindOneResponse<T>> {
    const req = await this._api.get(`${url}?${qs.stringify({ populate })}`);

    return req.data;
  }

  public async getAppLayoutProps(): Promise<AppLayoutProps> {
    const other = await this.getOne<OtherDataModel>('/other', ['logo']);
    const socialMediaLinks = await this.getSocialMediaLinks();

    return {
      headerProps: {
        longTitle: other.data.attributes.longTitle,
        shortTitle: other.data.attributes.shortTitle,
        logo: other.data.attributes.logo,
      },
      footerProps: {
        socialMediaLinks,
      },
    };
  }

  public async getPageProps(
    slug: string,
  ): Promise<StrapiPagePropsFields | null> {
    if (slug === '') {
      return null;
    }

    const req = await this._api.get<StrapiPagePropsFields>(
      `/pages-data/${slug}`,
    );
    return req.data;
  }

  public async getSocialMediaLinks(): Promise<
    StrapiFindResponse<SocialMediaLinkModel>
  > {
    return await this.get<SocialMediaLinkModel>('/social-media-links');
  }
}
