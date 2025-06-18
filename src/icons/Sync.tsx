import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgSync = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#sync_svg__a)" fill="currentColor">
      <path d="M11.608 2H13V1H9.5v3h1V2.548A5.98 5.98 0 0 1 14 8c0 3.308-2.692 6-6 6v1c3.86 0 7-3.14 7-7a6.98 6.98 0 0 0-3.392-6M8 2V1C4.14 1 1 4.14 1 8a6.98 6.98 0 0 0 3.392 6H3v1h3.5v-3h-1v1.452A5.98 5.98 0 0 1 2 8c0-3.308 2.692-6 6-6" />
    </g>
    <defs>
      <clipPath id="sync_svg__a">
        <path d="M0 0h16v16H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgSync);
export default Memo;
