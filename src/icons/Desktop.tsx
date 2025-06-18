import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgDesktop = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#desktop_svg__a)">
      <path
        d="M21 3H3a1.5 1.5 0 0 0-1.5 1.5v12A1.5 1.5 0 0 0 3 18h6v3H6v1.5h12V21h-3v-3h6a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 21 3m-7.5 18h-3v-3h3zm7.5-4.5H3v-12h18z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="desktop_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgDesktop);
export default Memo;
