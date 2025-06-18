import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgFish = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#fish_svg__a)" fill="currentColor">
      <path d="M18 6.5A.75.75 0 1 0 18 5a.75.75 0 0 0 0 1.5" />
      <path d="M19.5 2a12.014 12.014 0 0 0-12 12v1.5H2.25a.75.75 0 0 0-.53 1.28l6 6A.75.75 0 0 0 9 22.25V17h1.5a12.014 12.014 0 0 0 12-12V2zm-12 18.44L4.06 17H7.5zM9 15.5V14c0-2.708 1.05-5.31 2.93-7.258l5.828 5.827A10.46 10.46 0 0 1 10.5 15.5zM21 5c0 2.341-.787 4.614-2.235 6.454l-5.72-5.719A10.44 10.44 0 0 1 19.5 3.5H21z" />
    </g>
    <defs>
      <clipPath id="fish_svg__a">
        <path d="M0 .5h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgFish);
export default Memo;
