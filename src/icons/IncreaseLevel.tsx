import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgIncreaseLevel = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 25 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#increase-level_svg__a)">
      <path
        d="M17.75 3.5 14 6.313v4.875L11.75 9.5 8 12.313v4.874L5.75 15.5 2 18.313V23h1.5v-3.937l2.25-1.688L8 19.063V23h1.5v-9.937l2.25-1.688L14 13.063V23h1.5V7.063l2.25-1.688L20 7.063V23h1.5V6.313z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="increase-level_svg__a">
        <path d="M.5.5h24v24H.5z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgIncreaseLevel);
export default Memo;
