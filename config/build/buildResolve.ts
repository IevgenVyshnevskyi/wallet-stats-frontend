import webpack from "webpack";

const buildResolve = (): webpack.ResolveOptions => ({
  extensions: [".tsx", ".ts", ".js"],
});

export default buildResolve;
