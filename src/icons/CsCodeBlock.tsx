import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCsCodeBlock = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#cs-code-block_svg__a)" fill="currentColor">
      <path d="m16.628 12.249-1.935 1.935 1.057 1.065 3-3-3-3-1.065 1.057zM11.625 15.999l-1.436-.433L12.375 8.5l1.436.433zM7.372 12.249l1.935-1.935L8.25 9.249l-3 3 3 3 1.065-1.058z" />
      <path d="M7.282 21.999a5.256 5.256 0 0 1-5.25-5.25v-9a5.256 5.256 0 0 1 5.25-5.25v1.5a3.754 3.754 0 0 0-3.75 3.75v9a3.754 3.754 0 0 0 3.75 3.75zM16.717 21.999a5.256 5.256 0 0 0 5.25-5.25v-9a5.256 5.256 0 0 0-5.25-5.25v1.5a3.754 3.754 0 0 1 3.75 3.75v9a3.754 3.754 0 0 1-3.75 3.75z" />
    </g>
    <defs>
      <clipPath id="cs-code-block_svg__a">
        <path d="M0 .249h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgCsCodeBlock);
export default Memo;
