import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgLaptop = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19.5 18.004h-15a1.5 1.5 0 0 1-1.5-1.5v-10.5a1.5 1.5 0 0 1 1.5-1.5h15a1.5 1.5 0 0 1 1.5 1.5v10.5a1.5 1.5 0 0 1-1.5 1.5m-15-12v10.5h15v-10.5zM22.5 19.504h-21v1.5h21z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgLaptop);
export default Memo;
