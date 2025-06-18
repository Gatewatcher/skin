import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgNetwork2 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#network2_svg__a)" fill="currentColor">
      <path d="M12 15a3 3 0 1 1 0-5.999A3 3 0 0 1 12 15m0-4.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M3.75 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0-4.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M7.5 23.25a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0-4.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M16.5 23.25a3 3 0 1 1 0-5.999 3 3 0 0 1 0 5.999m0-4.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M20.25 15a3 3 0 1 1 0-5.999 3 3 0 0 1 0 5.999m0-4.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M16.5 6.75a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0-4.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M7.5 6.75a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0-4.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3" />
    </g>
    <defs>
      <clipPath id="network2_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgNetwork2);
export default Memo;
