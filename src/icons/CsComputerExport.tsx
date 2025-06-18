import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCsComputerExport = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#cs-computer-export_svg__a)" fill="currentColor">
      <path
        clipRule="evenodd"
        d="M14.25 3H3a1.5 1.5 0 0 0-1.5 1.5v12A1.5 1.5 0 0 0 3 18h6v3H6v1.5h12V21h-3v-3h6a1.5 1.5 0 0 0 1.5-1.5v-5.25H21v5.25H3v-12h11.25zM10.5 21h3v-3h-3z"
        fillRule="evenodd"
      />
      <path d="M22.5 3h-6v1.5h3.44l-5.395 5.394 1.06 1.06L21 5.56V9h1.5z" />
    </g>
    <defs>
      <clipPath id="cs-computer-export_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgCsComputerExport);
export default Memo;
