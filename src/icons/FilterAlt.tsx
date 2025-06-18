import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgFilterAlt = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#filter-alt_svg__a)">
      <path
        d="M13.5 21h-3A1.5 1.5 0 0 1 9 19.5v-5.693L3.443 8.25A1.5 1.5 0 0 1 3 7.193V4.5A1.5 1.5 0 0 1 4.5 3h15A1.5 1.5 0 0 1 21 4.5v2.693a1.5 1.5 0 0 1-.442 1.057L15 13.807V19.5a1.5 1.5 0 0 1-1.5 1.5m-9-16.5v2.693l6 6V19.5h3v-6.307l6-6V4.5z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="filter-alt_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgFilterAlt);
export default Memo;
