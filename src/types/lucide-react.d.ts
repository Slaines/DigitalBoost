/**
 * Type declarations for individual Lucide React icon imports
 * This file helps TypeScript recognize the individual icon imports
 */

declare module 'lucide-react/dist/esm/icons/*' {
  import { LucideIcon } from 'lucide-react';
  const Icon: LucideIcon;
  export default Icon;
}
