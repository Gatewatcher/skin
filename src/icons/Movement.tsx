import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgMovement = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#movement_svg__a)">
      <path
        d="m18 15-1.058 1.058 2.686 2.692H7.5a3 3 0 0 1 0-6h9a4.5 4.5 0 1 0 0-9H4.372l2.686-2.692L6 0 1.5 4.5 6 9l1.058-1.057L4.373 5.25H16.5a3 3 0 0 1 0 6h-9a4.5 4.5 0 1 0 0 9h12.128l-2.686 2.692L18 24l4.5-4.5z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="movement_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgMovement);
export default Memo;
