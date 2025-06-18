import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgStackedMove = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 21 21"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#stacked-move_svg__a)" fill="currentColor">
      <path d="M9.709 17.927H2.834a1.25 1.25 0 0 1-1.25-1.25V7.302a1.25 1.25 0 0 1 1.25-1.25h6.875a1.25 1.25 0 0 1 1.25 1.25v9.375a1.25 1.25 0 0 1-1.25 1.25M2.834 7.302v9.375h6.875V7.302z" />
      <path d="m16.584 4.177-.882.882 1.507 1.618h-3.125v-2.5a1.25 1.25 0 0 0-1.25-1.25h-6.25v1.25h6.25v8.75h1.25v-5h3.125l-1.507 1.619.882.881 3.125-3.125z" />
    </g>
    <defs>
      <clipPath id="stacked-move_svg__a">
        <path d="M.333.427h20v20h-20z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgStackedMove);
export default Memo;
