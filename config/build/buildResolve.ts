import webpack from "webpack";

export const buildResolve = (): webpack.ResolveOptions => ({
  extensions: [".tsx", ".ts", ".js"],
});
