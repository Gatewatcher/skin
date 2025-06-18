import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgPrinter = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#printer_svg__a)">
      <path
        d="M21 6.75h-2.25v-4.5H5.25v4.5H3a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h2.25v4.5h13.5v-4.5H21a1.5 1.5 0 0 0 1.5-1.5v-7.5a1.5 1.5 0 0 0-1.5-1.5m-14.25-3h10.5v3H6.75zm10.5 16.5H6.75v-7.5h10.5zm3.75-4.5h-2.25v-4.5H5.25v4.5H3v-7.5h18z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="printer_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgPrinter);
export default Memo;
