import { FC, memo, useContext } from 'react';
import classNames from 'classnames';

import responsiveContext from 'context/responsiveConext';
import headerLinks from 'constants/headerLinks';
import Link from 'next/link';
import { icons } from 'components/index';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: FC<Props> = ({ isOpen, onClose }) => {
  const { isMobileView } = useContext(responsiveContext);

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
    </aside>
  ) : null;
};

export default memo(SideMenu);
