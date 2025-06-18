import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgFlag = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#flag_svg__a)">
      <path
        d="M4.5 22.875H3v-21h18l-4.35 6.75 4.35 6.75H4.5zm0-9h13.747l-3.397-5.25 3.397-5.25H4.5z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="flag_svg__a">
        <path d="M0 .375h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgFlag);
export default Memo;
