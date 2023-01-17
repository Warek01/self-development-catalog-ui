// Query object model to be encoded via qs
export interface StrapiQuery {
  pagination?: {
    start?: number;
    limit?: number;
    page?: number;
    pageSize?: number;
    withCount?: boolean;
  };
  sort?: string[];
  populate?: string[];

  [key: string]: any;
}

// Error object in response
export interface StrapiError {
  details: any;
  message: string;
  name: string;
  status: number;
}

// Wrapper around entity returned by Strapi
export interface StrapiEntity<T> {
  id: number;
  attributes: T & {
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

// Meta object present in find responses
export interface StrapiFindMeta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface StrapiFindResponse<T> {
  data: StrapiEntity<T>[];
  meta: StrapiFindMeta;
  error?: StrapiError;
}

export interface StrapiFindOneResponse<T> {
  data: StrapiEntity<T>;
  meta: StrapiFindMeta;
  error?: StrapiError;
}

// Optional entity in strapi about current page
interface StrapiPagePropsFields {
  title: string;
  slug: string;
}

// Pages props should extend this if they want to search for data on Strapi
interface StrapiPageProps {
  pageData: PageDataFields;
}

export interface StrapiMultimediaModel {
  id: number;
  attributes: {
    name: string;
    alternativeText?: string;
    caption?: string;
    height: number;
    width: number;
    formats?: any;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string;
    provider: string;
    provider_metadata?: any;
  };
}
