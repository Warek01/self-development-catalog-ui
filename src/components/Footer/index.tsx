import { FC, memo } from 'react';

import type { FooterProps } from './interface';

import { icons, LinkIcon } from 'components/index';
import socialMediaIconsMap from 'constants/socialMediaIconsMap';

const Footer: FC<FooterProps> = ({ socialMediaLinks }) => {
  return (
    <footer className="flex justify-between border-t border-black/20 py-4">
      <nav className="flex-col gap-2 hidden md:flex">
        Follow me
        <ul className="flex gap-6">
          {socialMediaLinks.data?.map((link) => {
            const Icon =
              socialMediaIconsMap[
                link.attributes.platform as SocialMediaPlatform
              ];

            return (
              <li key={link.id}>
                <LinkIcon Icon={Icon} size={32} href={link.attributes.href} />
              </li>
            );
          })}
        </ul>
      </nav>
      <section className="flex flex-col gap-2">
        <p className="flex flex-col text-lg md:text-2xl font-semibold">
          Dobrojan Alexandru
        </p>
        <p className="flex gap-2 items-center justify-start md:justify-end">
          <LinkIcon
            Icon={icons.Github}
            href="https://github.com/Warek01/self-development-catalog-ui"
            size={24}
          />
          Source code
        </p>
      </section>
    </footer>
  );
};

export default memo(Footer);
