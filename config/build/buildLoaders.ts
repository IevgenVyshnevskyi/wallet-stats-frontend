import webpack from 'webpack';
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import { BuildOptions } from '../types/types';

export const buildLoaders = ({ isDev }: BuildOptions): webpack.RuleSetRule[] => {
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

  const graphicsLoader = {
    test: /\.(png|jpe?g|gif)$/i,
    use: {
      loader: 'file-loader',
      options: {
        outputPath: 'assets',
      },
    },
  };

  const fontsLoader = {
    test: /\.(ttf)$/i,
    use: {
      loader: 'file-loader',
      options: {
        outputPath: 'fonts',
      },
    },
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
    graphicsLoader,
    fontsLoader,
    typescriptLoader,
    styleLoader,
    babelLoader,
  ];
}
