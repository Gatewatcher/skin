import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgMobile = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.5 3h-9A1.5 1.5 0 0 0 6 4.5V21a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 18 21V4.5A1.5 1.5 0 0 0 16.5 3m0 1.5V6h-9V4.5zM7.5 21V7.5h9V21z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgMobile);
export default Memo;
