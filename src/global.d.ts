declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module "*.svg" {
  import { ReactElement, SVGProps } from "react";
  const content: (props: SVGProps<SVGElement>) => ReactElement;
  export default content;
}

declare module '*.ttf';
declare module '*.woff';
declare module '*.woff2';

// declare type StateSchema = import('./store').StateSchema;