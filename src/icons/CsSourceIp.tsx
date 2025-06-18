import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCsSourceIp = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#cs-source-ip_svg__a)" fill="currentColor">
      <path d="M12.75 22.5v-3h-1.5v3zM12 18a6 6 0 1 1 6-6 6.007 6.007 0 0 1-6 6m0-10.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9" />
    </g>
    <defs>
      <clipPath id="cs-source-ip_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgCsSourceIp);
export default Memo;
