import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

import { BuildOptions } from "../types/types";

export const buildDevServer = (
  options: BuildOptions
): DevServerConfiguration => {
  const { paths } = options;

  return {
    port: options.port,
    hot: true,
    open: true,
    historyApiFallback: true,
    static: {
      directory: paths.output,
    },
  };
};
