import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgGroupUtility = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 28 29"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect fill="currentColor" height={28} rx={14} width={28} y={0.5} />
    <g clipPath="url(#group-utility_svg__a)">
      <path
        d="m22.421 16.45-3.62-1.95 3.62-1.95a.624.624 0 0 0 0-1.1l-8.125-4.376a.62.62 0 0 0-.592 0L5.579 11.45a.625.625 0 0 0 0 1.1l3.62 1.95-3.62 1.95a.625.625 0 0 0 0 1.101l8.125 4.375a.63.63 0 0 0 .592 0l8.125-4.375a.624.624 0 0 0 0-1.1M14 8.335 20.807 12 14 15.665 7.193 12zm0 12.33L7.193 17l3.325-1.79 3.185 1.715a.63.63 0 0 0 .593 0l3.186-1.716L20.807 17z"
        fill="#fff"
      />
    </g>
    <defs>
      <clipPath id="group-utility_svg__a">
        <path d="M4 4.5h20v20H4z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgGroupUtility);
export default Memo;
