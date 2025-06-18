import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgChevronUpDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#chevron-up-down_svg__a)" fill="currentColor">
      <path d="m12 21-5.25-5.25 1.058-1.057L12 18.878l4.192-4.185 1.058 1.057zM12 3l5.25 5.25-1.058 1.057L12 5.123 7.808 9.308 6.75 8.25z" />
    </g>
    <defs>
      <clipPath id="chevron-up-down_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgChevronUpDown);
export default Memo;
