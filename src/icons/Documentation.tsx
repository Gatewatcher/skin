import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgDocumentation = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#documentation_svg__a)" fill="currentColor">
      <path d="M19.5 7.5h-5.25V9h5.25zM19.5 11.25h-5.25v1.5h5.25zM19.5 15h-5.25v1.5h5.25z" />
      <path d="M21 3.75H3a1.5 1.5 0 0 0-1.5 1.5v13.5a1.5 1.5 0 0 0 1.5 1.5h18a1.5 1.5 0 0 0 1.5-1.5V5.25a1.5 1.5 0 0 0-1.5-1.5M3 5.25h8.25v13.5H3zm9.75 13.5V5.25H21l.002 13.5z" />
    </g>
    <defs>
      <clipPath id="documentation_svg__a">
        <path d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgDocumentation);
export default Memo;
