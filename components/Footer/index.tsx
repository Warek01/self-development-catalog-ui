import { FC, memo } from 'react';
import useSwr from 'swr';
import Link from 'next/link';

import { StrapiFindResponse } from 'types/strapi';
import { icons } from 'components';
import socialMediaIconsMap from 'constants/socialMediaIconsMap';

const Footer: FC = () => {
  const socialMediaLinks = useSwr<StrapiFindResponse<SocialMediaLinkModel>>(
    process.env.NEXT_PUBLIC_STRAPI_API_URL + 'social-media-links',
  );

  return (
    <footer className="px-12">
      <main className="flex justify-between border-t border-black/20 py-4">
        <nav className="flex flex-col gap-2">
          Follow me
          <ul className="flex gap-3">
            {socialMediaLinks.data?.data?.map((link) => {
              const Icon = socialMediaIconsMap[link.attributes.platform];

              return (
                <li key={link.id}>
                  <Link href={link.attributes.href}>
                    <Icon width={32} height={32} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <section className="flex flex-col gap-2">
          <p className="flex flex-col text-lg md:text-2xl font-semibold">
            Dobrojan Alexandru
          </p>
          <Link
            href="https://github.com/Warek01/self-development-catalog-ui"
            className="flex gap-2 items-center justify-end"
          >
            <icons.Github height={20} width={20} />
            Source code
          </Link>
        </section>
      </main>
    </footer>
  );
};
export default memo(Footer);
