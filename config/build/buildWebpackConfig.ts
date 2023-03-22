import webpack from 'webpack';

import { BuildOptions } from './types/config';

import { buildLoaders } from './buildLoaders';
import { buildResolve } from './buildResolve';
import { buildPlugins } from './buildPlugins';
import { buildDevServer } from './buildDevServer';

export function buildWebpacConfig(options: BuildOptions): webpack.Configuration {
  const { paths, mode, isDev } = options

  return {
    mode,
    entry: paths.entry,
    devServer: isDev ? buildDevServer(options) : undefined,
    output: {
      filename: '[name].[contenthash].js',
      path: paths.output,
      clean: true,
    },
    module: {
      rules: buildLoaders(options)
    },
    resolve: buildResolve(),
    plugins: buildPlugins(options),
  }
}