/* eslint-disable */

declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  import { VNode } from 'vue';
  type Svg = VNode;
  const content: Svg;
  export default content;
}