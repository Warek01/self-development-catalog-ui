import { FC, memo } from 'react';
import useSwr from 'swr';

import { StrapiFindResponse } from 'types/strapi';
import { icons, LinkIcon } from 'components/index';
import socialMediaIconsMap from 'constants/socialMediaIconsMap';
import { Loading } from 'components';

const Footer: FC = () => {
  const socialMediaLinks = useSwr<StrapiFindResponse<SocialMediaLinkModel>>(
    process.env.NEXT_PUBLIC_STRAPI_API_URL + '/social-media-links',
  );

  return (
    <footer className="px-12">
      <main className="flex justify-between border-t border-black/20 py-4">
        <nav className="flex-col gap-2 hidden md:flex">
          Follow me
          {socialMediaLinks.isLoading || socialMediaLinks.isValidating ? (
            <Loading />
          ) : (
            <ul className="flex gap-6">
              {socialMediaLinks.data?.data?.map((link) => {
                const Icon = socialMediaIconsMap[link.attributes.platform];

                return (
                  <li key={link.id}>
                    <LinkIcon
                      Icon={Icon}
                      size={32}
                      href={link.attributes.href}
                    />
                  </li>
                );
              })}
            </ul>
          )}
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
      </main>
    </footer>
  );
};
export default memo(Footer);
