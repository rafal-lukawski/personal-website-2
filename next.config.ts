import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'standalone',
  // generateMetadata is async, so Next.js streams its tags to the end of <body>.
  // Match every user agent so title, description and Open Graph stay in <head>.
  htmlLimitedBots: /.*/,
};

export default withNextIntl(nextConfig);
