import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgIntrusionPrevention = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#intrusion-prevention_svg__a)" fill="currentColor">
      <path d="M16.5 19.415a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
      <path d="M22.333 17.609A6.48 6.48 0 0 0 16.5 13.5a6.48 6.48 0 0 0-5.833 4.109L10.5 18l.167.391A6.48 6.48 0 0 0 16.5 22.5a6.48 6.48 0 0 0 5.833-4.109L22.5 18zM16.5 21a3 3 0 1 1 0-5.999 3 3 0 0 1 0 5.999M18.75 7.5H3A1.5 1.5 0 0 1 1.5 6V3A1.5 1.5 0 0 1 3 1.5h15.75a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5M3 3v3h15.75V3zM9 21H3v-3h6v-1.5H3A1.5 1.5 0 0 0 1.5 18v3A1.5 1.5 0 0 0 3 22.5h6z" />
      <path d="M21 9H5.25a1.5 1.5 0 0 0-1.5 1.5v3a1.5 1.5 0 0 0 1.5 1.5H9v-1.5H5.25v-3H21V12h1.5v-1.5A1.5 1.5 0 0 0 21 9" />
    </g>
    <defs>
      <clipPath id="intrusion-prevention_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgIntrusionPrevention);
export default Memo;
