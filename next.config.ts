import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin()

/** @type {NextConfig} */
const nextConfig: NextConfig = {
    reactStrictMode: true,
    compress: true,
    turbopack: {
        root: __dirname
    },
    images: {
        // ✅ Nuovo formato consigliato
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'vercel.com',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
            },
            {
                protocol: 'https',
                hostname: 'export-download.canva.com',
            },
        ],
        formats: ['image/avif', 'image/webp'],
    },

    modularizeImports: {
        '@radix-ui/react-*': {
            transform: '@radix-ui/react-*/dist/index.js',
        },
    },

    eslint: {
        ignoreDuringBuilds: true,
    },

    typescript: {
        ignoreBuildErrors: false,
    },

    experimental: {
        scrollRestoration: true,
    },
};

export default withNextIntl(nextConfig);
