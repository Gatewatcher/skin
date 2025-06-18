import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgToolBox = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#tool-box_svg__a)">
      <path
        d="M20.25 6.75H18V4.5A1.5 1.5 0 0 0 16.5 3h-9A1.5 1.5 0 0 0 6 4.5v2.25H3.75A2.25 2.25 0 0 0 1.5 9v10.5A1.5 1.5 0 0 0 3 21h18a1.5 1.5 0 0 0 1.5-1.5V9a2.25 2.25 0 0 0-2.25-2.25M7.5 4.5h9v2.25h-9zm13.5 15H3v-6.75h6v3.75h6v-3.75h6zm-10.5-6.75h3V15h-3zM3 11.25V9a.75.75 0 0 1 .75-.75h16.5A.75.75 0 0 1 21 9v2.25z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="tool-box_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgToolBox);
export default Memo;
