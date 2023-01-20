import { FC, memo, useCallback, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import responsiveContext from 'context/responsiveConext';
import headerLinks from 'constants/headerLinks';
import { icons } from 'components/index';
import AppRoutes from 'constants/appRoutes';
import sideMenuContext from '../../context/sideMenuContext';

const Header: FC = () => {
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
          src="/Logo.png"
          alt="Self development catalog"
          priority={true}
          width={32}
          height={32}
          quality={100}
          draggable={false}
          placeholder="empty"
        />
        <span>
          Self-Dev
          <span className="hidden md:inline-block">elopment Catalog</span>
        </span>
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
