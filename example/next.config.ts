import type { NextConfig } from 'next'
import path from 'path'
import pak from '../package.json'

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  webpack: ( config ) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
      [ pak.name ]: path.join( __dirname, "..", pak.source )
    }
    config.resolve.roots = [ './src' ]
    config.resolve.extensions = [
      '.tsx',
      '.ts',
      '.js',
      '.json'
    ]

    return config
  },
  transpilePackages: [
    'antd-imask-input'
  ]
}

export default nextConfig
