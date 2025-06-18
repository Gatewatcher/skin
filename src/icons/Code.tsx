import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCode = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M23.25 12.249 18 17.499l-1.058-1.057 4.185-4.193-4.185-4.192L18 6.999zM.75 12.249 6 6.999l1.057 1.058-4.185 4.192 4.185 4.193L6 17.499zM13.23 4.75 9.313 19.362l1.449.389 3.915-14.613z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgCode);
export default Memo;
