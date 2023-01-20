import type {
  StrapiFindOneResponse,
  StrapiMultimediaModel,
} from 'types/strapi';

export interface HeaderProps {
  longTitle: string;
  shortTitle: string;
  logo: StrapiFindOneResponse<StrapiMultimediaModel>;
}
