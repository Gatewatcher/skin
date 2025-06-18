import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgApplication = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#application_svg__a)" fill="currentColor">
      <path d="M12 13.5H4.5A1.5 1.5 0 0 1 3 12V4.5A1.5 1.5 0 0 1 4.5 3H12a1.5 1.5 0 0 1 1.5 1.5V12a1.5 1.5 0 0 1-1.5 1.5m-7.5-9V12H12V4.5zM19.5 9v3h-3V9zm0-1.5h-3A1.5 1.5 0 0 0 15 9v3a1.5 1.5 0 0 0 1.5 1.5h3A1.5 1.5 0 0 0 21 12V9a1.5 1.5 0 0 0-1.5-1.5M19.5 16.5v3h-3v-3zm0-1.5h-3a1.5 1.5 0 0 0-1.5 1.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3a1.5 1.5 0 0 0-1.5-1.5M12 16.5v3H9v-3zm0-1.5H9a1.5 1.5 0 0 0-1.5 1.5v3A1.5 1.5 0 0 0 9 21h3a1.5 1.5 0 0 0 1.5-1.5v-3A1.5 1.5 0 0 0 12 15" />
    </g>
    <defs>
      <clipPath id="application_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgApplication);
export default Memo;
