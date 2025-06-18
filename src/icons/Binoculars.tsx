import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgBinoculars = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#binoculars_svg__a)">
      <path
        d="M21 6V3.75a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0-.75.75V6a1.5 1.5 0 0 0-1.5 1.5V9h-3V7.5A1.5 1.5 0 0 0 9 6V3.75A.75.75 0 0 0 8.25 3h-4.5a.75.75 0 0 0-.75.75V6a1.5 1.5 0 0 0-1.5 1.5v9a1.5 1.5 0 0 0 .75 1.29v2.46A.75.75 0 0 0 3 21h6a.75.75 0 0 0 .75-.75v-2.46a1.5 1.5 0 0 0 .75-1.29V15h3v1.5a1.5 1.5 0 0 0 .75 1.29v2.46A.75.75 0 0 0 15 21h6a.75.75 0 0 0 .75-.75v-2.46a1.5 1.5 0 0 0 .75-1.29v-9A1.5 1.5 0 0 0 21 6M8.25 19.5h-4.5V18h4.5zm.75-3H3v-9h1.5v-3h3v3H9zm1.5-3v-3h3v3zm9.75 6h-4.5V18h4.5zm.75-3h-6v-9h1.5v-3h3v3H21z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="binoculars_svg__a">
        <path d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgBinoculars);
export default Memo;
