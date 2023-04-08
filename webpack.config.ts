import path from 'path';
import { buildWebpacConfig } from './config/build/buildWebpackConfig';
import { BuildEnv, BuildPaths } from './types/config';

export default (env: BuildEnv) => {
  const mode = env.mode || 'development'
  const isDev = mode === 'development'
  const port = env.port || 3000;

  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
  }

  return buildWebpacConfig({
    mode,
    paths,
    isDev,
    port,
  })
} 