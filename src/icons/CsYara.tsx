import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCsYara = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#cs-yara_svg__a)" fill="currentColor">
      <path d="M21 9.75V6a1.5 1.5 0 0 0-1.5-1.5h-2.25V6h2.25v3.75A2.98 2.98 0 0 0 20.537 12a2.98 2.98 0 0 0-1.037 2.25V18h-2.25v1.5h2.25A1.5 1.5 0 0 0 21 18v-3.75a1.5 1.5 0 0 1 1.5-1.5v-1.5a1.5 1.5 0 0 1-1.5-1.5M4.5 9.75V6h2.25V4.5H4.5A1.5 1.5 0 0 0 3 6v3.75a1.5 1.5 0 0 1-1.5 1.5v1.5a1.5 1.5 0 0 1 1.5 1.5V18a1.5 1.5 0 0 0 1.5 1.5h2.25V18H4.5v-3.75A2.98 2.98 0 0 0 3.463 12 2.98 2.98 0 0 0 4.5 9.75M13.5 6.75 12 12.39l-1.44-5.64H9l2.363 7.403-.465 1.597H9v1.5h1.695a1.5 1.5 0 0 0 1.432-1.065L15 6.75z" />
    </g>
    <defs>
      <clipPath id="cs-yara_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgCsYara);
export default Memo;
