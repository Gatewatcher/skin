import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgDevelopment = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#development_svg__a)" fill="currentColor">
      <path d="M6 3v3H3V3zM1.5 1.5v6h6v-6zM13.5 5.25v3h-3v-3zM9 3.75v6h6v-6zM6 12v3H3v-3zm-4.5-1.5v6h6v-6z" />
      <path d="M16.5 7.5V12H12v4.5H7.5v6h15v-15zm-3 6h3v3h-3zM12 21H9v-3h3zm4.5 0h-3v-3h3zm4.5 0h-3v-3h3zm0-4.5h-3v-3h3zM18 12V9h3v3z" />
    </g>
    <defs>
      <clipPath id="development_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgDevelopment);
export default Memo;
