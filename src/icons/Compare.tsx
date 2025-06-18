import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCompare = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#compare_svg__a)">
      <path
        d="M21 4.5h-7.5V3A1.5 1.5 0 0 0 12 1.5H3A1.5 1.5 0 0 0 1.5 3v15A1.5 1.5 0 0 0 3 19.5h7.5V21a1.5 1.5 0 0 0 1.5 1.5h9a1.5 1.5 0 0 0 1.5-1.5V6A1.5 1.5 0 0 0 21 4.5M3 11.25h4.628l-1.936 1.943L6.75 14.25l3.75-3.75-3.75-3.75-1.057 1.058L7.627 9.75H3V3h9v15H3zM12 21v-1.5a1.5 1.5 0 0 0 1.5-1.5V6H21v6.75h-4.628l1.936-1.943L17.25 9.75 13.5 13.5l3.75 3.75 1.058-1.058-1.936-1.942H21V21z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="compare_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgCompare);
export default Memo;
