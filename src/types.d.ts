declare module "*.tsx" {
  import type { ComponentType } from "react";
  const component: ComponentType;
  export default component;
}
