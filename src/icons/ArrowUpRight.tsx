import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgArrowUpRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7.5 4.5V6h9.442L4.5 18.442 5.558 19.5 18 7.058V16.5h1.5v-12z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgArrowUpRight);
export default Memo;
