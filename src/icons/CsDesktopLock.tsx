import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCsDesktopLock = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#cs-desktop-lock_svg__a)" fill="currentColor">
      <path
        clipRule="evenodd"
        d="M18 3h3a1.5 1.5 0 0 1 1.5 1.5v12A1.5 1.5 0 0 1 21 18h-6v3h3v1.5H6V21h3v-3H3a1.5 1.5 0 0 1-1.5-1.5v-12A1.5 1.5 0 0 1 3 3h3v1.5H3v12h18v-12h-3zm-7.5 18h3v-3h-3z"
        fillRule="evenodd"
      />
      <path d="M15 6.75h-4.5V4.5a1.5 1.5 0 1 1 3 0v2.25H15V4.5a3 3 0 0 0-6 0v2.25a1.5 1.5 0 0 0-1.5 1.5V12A1.5 1.5 0 0 0 9 13.5h6a1.5 1.5 0 0 0 1.5-1.5V8.25a1.5 1.5 0 0 0-1.5-1.5M9 12V8.25h6V12z" />
    </g>
    <defs>
      <clipPath id="cs-desktop-lock_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgCsDesktopLock);
export default Memo;
