import webpack from 'webpack';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from './types/config';

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
  const typescriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };

  const styleLoader = {
    test: /\.css$/,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      'css-loader',
    ],
  };

  const svgLoader = {
    test: /\.svg$/,
    use: '@svgr/webpack',
  };

  const fileLoader = {
    test: /\.(png|jpe?g|gif|ttf)$/i,
    use: 'file-loader',
  };

  const babelLoader = {
    test: /\.m?js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env', { targets: 'defaults' }],
        ],
        plugins: [isDev && require.resolve('react-refresh/babel')].filter(Boolean),
      },
    },
  };

  return [
    svgLoader,
    fileLoader,
    typescriptLoader,
    babelLoader,
    styleLoader,
  ];
}
