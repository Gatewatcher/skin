import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCsDgaDetect = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#cs-dga-detect_svg__a)" fill="currentColor">
      <path d="M13.5 4.5H15V3h-1.5a2.98 2.98 0 0 0-2.25 1.037A2.98 2.98 0 0 0 9 3h-.75A6.76 6.76 0 0 0 1.5 9.75v4.5A6.76 6.76 0 0 0 8.25 21H9a2.98 2.98 0 0 0 2.25-1.037A2.98 2.98 0 0 0 13.5 21H15v-1.5h-1.5A1.5 1.5 0 0 1 12 18V6a1.5 1.5 0 0 1 1.5-1.5M9 19.5h-.75A5.25 5.25 0 0 1 3.06 15H4.5v-1.5H3v-3h2.25A2.253 2.253 0 0 0 7.5 8.25v-1.5H6v1.5a.75.75 0 0 1-.75.75H3.06a5.254 5.254 0 0 1 5.19-4.5H9A1.5 1.5 0 0 1 10.5 6v3H9v1.5h1.5v3H9a2.253 2.253 0 0 0-2.25 2.25v1.5h1.5v-1.5A.75.75 0 0 1 9 15h1.5v3A1.5 1.5 0 0 1 9 19.5" />
      <path d="M22.5 8.625 19.125 5.25l-1.058 1.058 1.56 1.567H13.5v1.5h6.128l-1.56 1.568L19.124 12zM22.5 16.875 19.125 13.5l-1.058 1.057 1.56 1.568H13.5v1.5h6.128l-1.56 1.567 1.057 1.058z" />
    </g>
    <defs>
      <clipPath id="cs-dga-detect_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgCsDgaDetect);
export default Memo;
