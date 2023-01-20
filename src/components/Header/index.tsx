import { FC, memo, useCallback, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import type { HeaderProps } from './interface';

import responsiveContext from 'context/responsiveConext';
import headerLinks from 'constants/headerLinks';
import { icons } from 'components/index';
import AppRoutes from 'constants/appRoutes';
import sideMenuContext from 'context/sideMenuContext';

const Header: FC<HeaderProps> = ({ longTitle, shortTitle, logo }) => {
  const { isMobileView } = useContext(responsiveContext);
  const { isOpen, open } = useContext(sideMenuContext);

  const handleOpenMenu = useCallback(() => {
    if (!isMobileView) {
      return;
    }

    open();
  }, [isOpen, isMobileView]);

  return (
    <header className="flex justify-between py-6 max-h-20">
      <Link
        href={AppRoutes.home}
        className="flex gap-6 items-center font-semibold text-lg md:text-xl"
      >
        <Image
          src={process.env.NEXT_PUBLIC_STRAPI_URL + logo.data.attributes.url}
          alt={longTitle}
          priority={true}
          width={32}
          height={32}
          quality={100}
          draggable={false}
          placeholder="empty"
        />
        <span className="hidden md:inline-block">{longTitle}</span>
        <span className="inline-block md:hidden">{shortTitle}</span>
      </Link>
      <div className="flex items-center">
        {isMobileView ? (
          <button onClick={handleOpenMenu} className="p-2 rounded-lg">
            <icons.Menu width={25} height={25} />
          </button>
        ) : (
          <ul className="flex flex-row gap-12 text-17">
            {headerLinks.map((link) => (
              <Link href={link.href} key={link.text} className="">
                {link.text}
              </Link>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
};

export default memo(Header);
