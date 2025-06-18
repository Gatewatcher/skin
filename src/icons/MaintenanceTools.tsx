import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgMaintenanceTools = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#maintenance-tools_svg__a)">
      <path
        d="M9.075 1.5a7.35 7.35 0 0 0-4.05 1.2l4.8 4.8a1.575 1.575 0 0 1 .15 2.25 1.576 1.576 0 0 1-2.25-.15l-4.95-4.8A7.4 7.4 0 0 0 1.5 9.075a7.605 7.605 0 0 0 7.575 7.575 8.2 8.2 0 0 0 1.95-.225l5.025 5.025a3.765 3.765 0 1 0 5.325-5.325L16.35 11.1a8.2 8.2 0 0 0 .225-1.95 7.5 7.5 0 0 0-7.5-7.65m6 7.575a5.7 5.7 0 0 1-.225 1.575l-.225.825.6.6L20.25 17.1a2.16 2.16 0 0 1 .675 1.575 2.04 2.04 0 0 1-.675 1.575 2.175 2.175 0 0 1-3.15 0l-5.025-5.025-.6-.6-.825.225a5.7 5.7 0 0 1-1.575.225A6.2 6.2 0 0 1 4.8 13.35 5.72 5.72 0 0 1 3 9.075a6.3 6.3 0 0 1 .225-1.65l3.3 3.3a3.105 3.105 0 0 0 4.425.15 3.103 3.103 0 0 0-.15-4.425l-3.3-3.3c.485-.153.991-.23 1.5-.225a6.2 6.2 0 0 1 4.275 1.725 6.37 6.37 0 0 1 1.8 4.425"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="maintenance-tools_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgMaintenanceTools);
export default Memo;
