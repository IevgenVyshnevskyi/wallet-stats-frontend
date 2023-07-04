import webpack from 'webpack';

import { buildLoaders } from './buildLoaders';
import { buildResolve } from './buildResolve';
import { buildPlugins } from './buildPlugins';
import { buildDevServer } from './buildDevServer';

import { BuildOptions } from '../types/types';

export const buildWebpacConfig = (options: BuildOptions): webpack.Configuration => {
  const { paths, mode, isDev } = options

  return {
    mode,
    entry: paths.entry,
    devServer: isDev ? buildDevServer(options) : undefined,
    output: {
      filename: '[name].[contenthash].js',
      path: paths.output,
      publicPath: '/',
      clean: true,
    },
    module: {
      rules: buildLoaders(options)
    },
    resolve: buildResolve(),
    plugins: buildPlugins(options),
  }
}