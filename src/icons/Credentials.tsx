import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCredentials = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#credentials_svg__a)" fill="currentColor">
      <path d="M12 16.5a3 3 0 1 0 0-5.999 3 3 0 0 0 0 5.999m0-4.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3M13.5 4.5h-3V6h3z" />
      <path d="M18 1.5H6A1.5 1.5 0 0 0 4.5 3v18A1.5 1.5 0 0 0 6 22.5h12a1.5 1.5 0 0 0 1.5-1.5V3A1.5 1.5 0 0 0 18 1.5M15 21H9v-1.5a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75zm1.5 0v-1.5a2.25 2.25 0 0 0-2.25-2.25h-4.5A2.25 2.25 0 0 0 7.5 19.5V21H6V3h12v18z" />
    </g>
    <defs>
      <clipPath id="credentials_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgCredentials);
export default Memo;
