import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgPlug = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#plug_svg__a)">
      <path
        d="M16.5 6h-.75V1.5h-1.5V6h-4.5V1.5h-1.5V6H7.5A1.5 1.5 0 0 0 6 7.5V12a6.006 6.006 0 0 0 5.25 5.948V22.5h1.5v-4.552A6.006 6.006 0 0 0 18 12V7.5A1.5 1.5 0 0 0 16.5 6m0 6a4.5 4.5 0 1 1-9 0V7.5h9z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="plug_svg__a">
        <path d="M0 0h24v24H0z" fill="currentColor" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgPlug);
export default Memo;
