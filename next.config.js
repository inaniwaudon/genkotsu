const path = require('path')

const CopyPlugin = require('copy-webpack-plugin')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.GITHUB_ACTIONS ? '/genkotsu' : '',
  webpack: (config) => {
    const nextPublicDirPath = path.resolve(__dirname, 'public')
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: './node_modules/gif.js/dist/gif.worker.js',
            to: nextPublicDirPath,
          },
          {
            from: './node_modules/gif.js/dist/gif.worker.js.map',
            to: nextPublicDirPath,
          },
        ],
      }),
    )

    return config
  },
  trailingSlash: true,
}

module.exports = nextConfig
