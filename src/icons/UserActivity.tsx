import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgUserActivity = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#user-activity_svg__a)" fill="currentColor">
      <path d="M25 23h-.021a1 1 0 0 1-.94-.726L20.87 11.19l-1.934 5.16A1 1 0 0 1 18 17h-4v-2h3.307l2.757-7.351a1 1 0 0 1 1.898.076l3.111 10.892 1.979-5.933A1 1 0 0 1 28 12h4v2h-3.28l-2.772 8.316A1 1 0 0 1 25 23M15 30h-2v-7a3.004 3.004 0 0 0-3-3H6a3.003 3.003 0 0 0-3 3v7H1v-7a5.006 5.006 0 0 1 5-5h4a5.006 5.006 0 0 1 5 5zM8 8a3 3 0 1 1 0 6 3 3 0 0 1 0-6m0-2a5 5 0 1 0 0 10A5 5 0 0 0 8 6" />
    </g>
    <defs>
      <clipPath id="user-activity_svg__a">
        <path d="M0 0h32v32H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgUserActivity);
export default Memo;
