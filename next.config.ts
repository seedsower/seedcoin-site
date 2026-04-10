import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'assets.coingecko.com' },
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/docs',
        destination: 'https://seedcoin.gitbook.io/seedcoin',
        permanent: false,
      },
    ]
  },
  webpack(config, { isServer }) {
    if (isServer) {
      // WalletConnect / Solana wallet adapters use browser-only storage APIs
      // (indexedDB, localStorage) at module evaluation time. Stub them out on
      // the server so static generation doesn't emit spurious warnings.
      config.resolve.alias = {
        ...config.resolve.alias,
        'pino-pretty': false,
      }
    }
    return config
  },
}

export default nextConfig
