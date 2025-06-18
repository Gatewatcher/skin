import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgTerminal = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#terminal_svg__a)" fill="currentColor">
      <path d="M19.5 3.008h-15a1.5 1.5 0 0 0-1.5 1.5v15a1.5 1.5 0 0 0 1.5 1.5h15a1.5 1.5 0 0 0 1.5-1.5v-15a1.5 1.5 0 0 0-1.5-1.5m0 1.5v3h-15v-3zm-15 15v-10.5h15v10.5z" />
      <path d="m8.07 12.135 2.115 2.122L8.07 16.38l1.057 1.057 3.18-3.18-3.18-3.18z" />
    </g>
    <defs>
      <clipPath id="terminal_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgTerminal);
export default Memo;
