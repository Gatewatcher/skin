import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgMapIdentify = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 25 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3.5 8H2V3.5A1.5 1.5 0 0 1 3.5 2H8v1.5H3.5zM8 23H3.5A1.5 1.5 0 0 1 2 21.5V17h1.5v4.5H8zM21.5 23H17v-1.5h4.5V17H23v4.5a1.5 1.5 0 0 1-1.5 1.5M23 8h-1.5V3.5H17V2h4.5A1.5 1.5 0 0 1 23 3.5z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgMapIdentify);
export default Memo;
