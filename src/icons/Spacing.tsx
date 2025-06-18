import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgSpacing = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#spacing_svg__a)" fill="currentColor">
      <path d="M6.938 9.75H5.25a1.126 1.126 0 0 1-1.125-1.125v-2.25A1.126 1.126 0 0 1 5.25 5.25h1.688v1.125H5.25v2.25h1.688zM11.438 8.625H8.062V9.75h3.376zM15.938 8.625h-3.376V9.75h3.376zM18.75 9.75h-1.687V8.625h1.687v-2.25h-1.687V5.25h1.687a1.126 1.126 0 0 1 1.125 1.125v2.25A1.126 1.126 0 0 1 18.75 9.75M15.938 5.25h-3.376v1.125h3.376zM11.438 5.25H8.062v1.125h3.376zM18.75 18.75H5.25a1.126 1.126 0 0 1-1.125-1.125v-2.25A1.126 1.126 0 0 1 5.25 14.25h13.5a1.126 1.126 0 0 1 1.125 1.125v2.25a1.126 1.126 0 0 1-1.125 1.125m-13.5-3.375v2.25h13.5v-2.25zM19.875 11.438H4.125v1.124h15.75z" />
    </g>
    <defs>
      <clipPath id="spacing_svg__a">
        <path d="M3 3h18v18H3z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgSpacing);
export default Memo;
