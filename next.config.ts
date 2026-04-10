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

  // Keep these packages out of the server bundle entirely.
  // WalletConnect and Solana wallet adapters call browser-only APIs
  // (indexedDB, localStorage, crypto.subtle) at module-evaluation time,
  // which crashes Netlify's serverless runtime.  Externalising them means
  // they are never required() on the server; they only load in the browser
  // via the 'use client' + dynamic(..., { ssr: false }) components.
  serverExternalPackages: [
    '@walletconnect/core',
    '@walletconnect/sign-client',
    '@walletconnect/universal-provider',
    '@walletconnect/ethereum-provider',
    '@walletconnect/solana-adapter',
    '@walletconnect/logger',
    '@rainbow-me/rainbowkit',
    'wagmi',
    '@solana/wallet-adapter-base',
    '@solana/wallet-adapter-react',
    '@solana/wallet-adapter-react-ui',
    '@solana/wallet-adapter-wallets',
    '@solana/wallet-adapter-walletconnect',
    '@solana/web3.js',
    'pino',
    'pino-pretty',
  ],

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
      config.resolve.alias = {
        ...config.resolve.alias,
        'pino-pretty': false,
      }
    }
    return config
  },
}

export default nextConfig
