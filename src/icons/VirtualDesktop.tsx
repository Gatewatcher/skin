import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgVirtualDesktop = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#virtual-desktop_svg__a)" fill="currentColor">
      <path d="M15.75 12.906h-7.5a1.5 1.5 0 0 0-1.5 1.5v4.5a1.5 1.5 0 0 0 1.5 1.5h3v1.5H9v1.5h6v-1.5h-2.25v-1.5h3a1.5 1.5 0 0 0 1.5-1.5v-4.5a1.5 1.5 0 0 0-1.5-1.5m-7.5 6v-4.5h7.5l.001 4.5z" />
      <path d="M19.366 8.5a7.5 7.5 0 0 0-14.732 0 5.618 5.618 0 0 0 .616 11.137v-1.5a4.12 4.12 0 0 1 .092-8.215l.628-.043.067-.625a5.998 5.998 0 0 1 11.926 0l.068.625.627.043a4.12 4.12 0 0 1 .092 8.215v1.5A5.619 5.619 0 0 0 19.366 8.5" />
    </g>
    <defs>
      <clipPath id="virtual-desktop_svg__a">
        <path d="M0 .906h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgVirtualDesktop);
export default Memo;
