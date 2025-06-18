import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgTwoFactorAuthentication = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#two-factor-authentication_svg__a)">
      <path d="m8.25 17.385-1.5-1.5-1.058 1.057L8.25 19.5l4.5-4.5-1.057-1.058z" />
      <path
        d="M21 22.5h-3V21h3v-9h-3V6a3.003 3.003 0 0 0-3-3V1.5A4.505 4.505 0 0 1 19.5 6v4.5H21a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5"
        fill="currentColor"
      />
      <path
        d="M15 10.5h-1.5V6a4.5 4.5 0 1 0-9 0v4.5H3A1.5 1.5 0 0 0 1.5 12v9A1.5 1.5 0 0 0 3 22.5h12a1.5 1.5 0 0 0 1.5-1.5v-9a1.5 1.5 0 0 0-1.5-1.5M6 6a3 3 0 1 1 6 0v4.5H6zm9 15H3v-9h12z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="two-factor-authentication_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgTwoFactorAuthentication);
export default Memo;
