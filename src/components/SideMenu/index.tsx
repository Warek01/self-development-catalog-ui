import { FC, memo, useContext } from 'react';
import classNames from 'classnames';
import useSwr from 'swr';

import responsiveContext from 'context/responsiveConext';
import headerLinks from 'constants/headerLinks';
import Link from 'next/link';
import { icons, LinkIcon, Loading } from 'components/index';
import { StrapiFindResponse } from '../../types/strapi';
import socialMediaIconsMap from '../../constants/socialMediaIconsMap';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: FC<Props> = ({ isOpen, onClose }) => {
  const { isMobileView } = useContext(responsiveContext);

  const socialMediaLinks = useSwr<StrapiFindResponse<SocialMediaLinkModel>>(
    process.env.NEXT_PUBLIC_STRAPI_API_URL + '/social-media-links',
  );

  return isMobileView ? (
    <aside
      className={classNames(
        'fixed h-full max-w-[100vw] duration-200 w-72 right-0 top-0 z-50 transform-gpu transform',
        'bg-white border-l border-black/20 flex flex-col items-center py-6',
        {
          'translate-x-full pointer-events-none': !isOpen,
        },
      )}
    >
      <div className="flex w-full pr-12 pb-16 justify-end">
        <button onClick={onClose} className="p-2 rounded-full">
          <icons.Close width={32} height={32} />
        </button>
      </div>
      <ul className="flex flex-col items-center gap-8 text-2xl">
        {headerLinks.map((link) => (
          <Link href={link.href} key={link.text}>
            {link.text}
          </Link>
        ))}
      </ul>

      {socialMediaLinks.isLoading || socialMediaLinks.isValidating ? (
        <Loading />
      ) : (
        <ul className="absolute bottom-12 gap-12 grid grid-cols-2 w-9/12">
          {socialMediaLinks.data?.data?.map((link) => {
            const Icon = socialMediaIconsMap[link.attributes.platform];

            return (
              <li key={link.id} className="col-span-1 flex items-center justify-center">
                <LinkIcon Icon={Icon} size={32} href={link.attributes.href} />
              </li>
            );
          })}
        </ul>
      )}
    </aside>
  ) : null;
};

export default memo(SideMenu);
