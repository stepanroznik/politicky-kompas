declare module '*.png' {

    import { VNode } from 'vue';

    type Png = VNode;

    const content: Png;
    export default content;
}