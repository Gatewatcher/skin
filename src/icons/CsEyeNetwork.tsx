import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCsEyeNetwork = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#cs-eye-network_svg__a)" fill="currentColor">
      <path d="M6.525 4.714A2.23 2.23 0 0 0 6.371 2.5 2.25 2.25 0 1 0 4.5 6a2.2 2.2 0 0 0 .964-.226L7.5 7.811V10.5H9V7.19zM4.5 4.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5M14.25 3.75a2.25 2.25 0 1 0-3 2.112V10.5h1.5V5.862a2.25 2.25 0 0 0 1.5-2.112M12 4.5A.75.75 0 1 1 12 3a.75.75 0 0 1 0 1.5M19.5 1.5a2.253 2.253 0 0 0-2.25 2.25c.002.334.079.664.225.964L15 7.189V10.5h1.5V7.81l2.036-2.036a2.22 2.22 0 0 0 2.555-.433A2.25 2.25 0 0 0 19.5 1.5m0 3a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5M12 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
      <path d="M17.833 16.109A6.48 6.48 0 0 0 12 12a6.48 6.48 0 0 0-5.833 4.109L6 16.5l.167.391A6.48 6.48 0 0 0 12 21a6.48 6.48 0 0 0 5.833-4.109L18 16.5zM12 19.5a3 3 0 1 1 0-5.999 3 3 0 0 1 0 5.999" />
    </g>
    <defs>
      <clipPath id="cs-eye-network_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgCsEyeNetwork);
export default Memo;
