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
}

export interface StrapiError {
  details: any;
  message: string;
  name: string;
  status: number;
}

export interface StrapiEntity<T> {
  id: number;
  attributes: T & {
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

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
