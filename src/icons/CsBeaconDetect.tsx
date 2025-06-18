import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCsBeaconDetect = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#cs-beacon-detect_svg__a)" fill="currentColor">
      <path d="M9 4.5h1.5V6H9zM12.75 4.5h1.5V6h-1.5z" />
      <path
        clipRule="evenodd"
        d="M6 3a1.5 1.5 0 0 1 1.5-1.5h8.25a1.5 1.5 0 0 1 1.5 1.5v.75h1.5v1.5h-1.5v3a1.5 1.5 0 0 1-1.5 1.5H15v1.5h3a2.25 2.25 0 0 1 2.25 2.25v2.25h-1.5V13.5a.75.75 0 0 0-.75-.75H6a.75.75 0 0 0-.75.75v2.25h-1.5V13.5A2.25 2.25 0 0 1 6 11.25h2.25v-1.5H7.5A1.5 1.5 0 0 1 6 8.25v-3H4.5v-1.5H6zm1.5 0h8.25v5.25H7.5zm2.25 8.25h3.75v-1.5H9.75z"
        fillRule="evenodd"
      />
      <path d="m11.25 18.75-3-3-3 3 1.058 1.065L7.5 18.622V22.5H9v-3.878l1.185 1.186zM12.75 19.5l3 3 3-3-1.058-1.065-1.192 1.193V15.75H15v3.878l-1.185-1.186z" />
    </g>
    <defs>
      <clipPath id="cs-beacon-detect_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgCsBeaconDetect);
export default Memo;
