import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCsUserComputer = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#cs-user-computer_svg__a)" fill="currentColor">
      <path d="M21 3H4.5A1.5 1.5 0 0 0 3 4.5v3.75h1.5V4.5H21V15H10.5v1.5H12v3h-1.5V21h6.75v-1.5H13.5v-3H21a1.5 1.5 0 0 0 1.5-1.5V4.5A1.5 1.5 0 0 0 21 3" />
      <path
        clipRule="evenodd"
        d="M5.25 14.25a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m0 1.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6M3.75 18a.75.75 0 0 0-.75.75V21H1.5v-2.25a2.25 2.25 0 0 1 2.25-2.25h3A2.25 2.25 0 0 1 9 18.75V21H7.5v-2.25a.75.75 0 0 0-.75-.75zM12 12.75v-3h1.5v3zM15 12.75v-6h1.5v6z"
        fillRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="cs-user-computer_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgCsUserComputer);
export default Memo;
