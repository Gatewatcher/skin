import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCsPrivate = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      clipPath="url(#cs-private_svg__a)"
      clipRule="evenodd"
      fill="currentColor"
      fillRule="evenodd"
    >
      <path d="M11.733 17.25a4.126 4.126 0 1 1-.138-1.5h1.81a4.127 4.127 0 0 1 8.095 1.125 4.125 4.125 0 0 1-8.233.375zM7.625 19.5a2.625 2.625 0 1 0 0-5.25 2.625 2.625 0 0 0 0 5.25m9.75 0a2.625 2.625 0 1 0 0-5.25 2.625 2.625 0 0 0 0 5.25M5 9V6a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v3h3v1.5H2V9zm3-4.5h9A1.5 1.5 0 0 1 18.5 6v3h-12V6A1.5 1.5 0 0 1 8 4.5" />
    </g>
    <defs>
      <clipPath id="cs-private_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgCsPrivate);
export default Memo;
