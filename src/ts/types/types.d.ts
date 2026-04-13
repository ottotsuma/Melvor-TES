declare module "*.png" {
  const value: any;
  export default value;
}
declare module '*.css';
type Component<T> = {
  [P in keyof T]: T[P];
} & { $template: string; }