import { FC, memo } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import type { StrapiFindOneResponse, StrapiMultimediaModel } from 'types/strapi';

import { useRenderState } from 'utils/hooks';
import style from './style.module.scss';

interface Props {
  message: string;
  welcomeImage: StrapiFindOneResponse<StrapiMultimediaModel>;
}

const Welcome: FC<Props> = ({ message, welcomeImage }) => {
  const isRendered = useRenderState(150);

  return (
    <div className="flex py-20 justify-between items-center w-full md:my-12">
      <div className="flex flex-col flex-1">
        <p
          className={classNames(
            style.transition,
            'w-fit text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold relative whitespace-pre-line',
            'transform transform-gpu left-0 md:hover:left-6 bottom-0 md:hover:bottom-4 z-10',
            {
              'opacity-0 -translate-x-full': !isRendered,
            },
          )}
        >
          {message}
        </p>
      </div>
      <div className="flex items-center absolute right-12">
        <Image
          src={process.env.NEXT_PUBLIC_STRAPI_URL + welcomeImage.data.attributes.url}
          alt="Shapes"
          width={200}
          height={200}
          quality={100}
          priority={true}
          className={classNames(
            style.transition,
            'transform transform-gpu relative',
            'right-0 md:hover:right-6 bottom-0 md:hover:bottom-4',

            {
              'opacity-0 translate-x-[500px]': !isRendered,
            },
          )}
        />
      </div>
    </div>
  );
};

export default memo(Welcome);
