import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgActionFilled = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 28 29"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect fill="currentColor" height={28} rx={14} width={28} y={0.5} />
    <g clipPath="url(#action-filled_svg__a)">
      <path
        clipRule="evenodd"
        d="M17.12 5.832a.625.625 0 0 1 .308.684l-1.09 4.834h3.005a.625.625 0 0 1 .496 1.006l-8.17 10.646a.625.625 0 0 1-1.114-.476l1.147-7.406H8.657a.625.625 0 0 1-.44-1.068l8.16-8.116a.625.625 0 0 1 .743-.104m-6.948 8.038h2.989l-.996 6.433 5.91-7.703h-3.301l.962-4.263z"
        fill="#fff"
        fillRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="action-filled_svg__a">
        <path d="M4 4.5h20v20H4z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgActionFilled);
export default Memo;
