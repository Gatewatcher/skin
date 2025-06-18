import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgExecutableProgram = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#executable-program_svg__a)" fill="currentColor">
      <path
        clipRule="evenodd"
        d="M18.75 15.75 24 19.5l-5.25 3.75z"
        fillRule="evenodd"
      />
      <path d="m15.128 14.25-1.943 1.942 1.065 1.058 3-3-3-3-1.065 1.057zM8.873 14.25l1.942-1.943L9.75 11.25l-3 3 3 3 1.065-1.058zM6.75 6.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5M4.5 6.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5" />
      <path d="M15.75 19.5H3V9h18v5.25h1.5V4.5c0-.827-.673-1.5-1.5-1.5H3c-.827 0-1.5.673-1.5 1.5v15c0 .827.673 1.5 1.5 1.5h12.75zM3 4.5h18v3H3z" />
    </g>
    <defs>
      <clipPath id="executable-program_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgExecutableProgram);
export default Memo;
