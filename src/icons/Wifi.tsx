import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgWifi = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 25 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#wifi_svg__a)" fill="currentColor">
      <path d="M12.125 20.879a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M7.977 15.054l1.06 1.06a4.477 4.477 0 0 1 6.168-.007l1.06-1.06a5.97 5.97 0 0 0-8.288.007" />
      <path d="m4.797 11.873 1.06 1.06a8.966 8.966 0 0 1 12.528-.007l1.06-1.06a10.464 10.464 0 0 0-14.648.007" />
      <path d="M22.625 8.685a14.955 14.955 0 0 0-21 0v.017l1.053 1.053a13.45 13.45 0 0 1 18.886-.008l1.061-1.06z" />
    </g>
    <defs>
      <clipPath id="wifi_svg__a">
        <path d="M.125.629h24v24h-24z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgWifi);
export default Memo;
