import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCloudOffline = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#cloud-offline_svg__a)" fill="currentColor">
      <path d="M18.6 9.746a6.7 6.7 0 0 0-.734-1.908L22.5 3.204l-1.06-1.06L1.5 22.084l1.06 1.06 3.75-3.75h11.315a4.873 4.873 0 0 0 .976-9.648m-.975 8.148H7.811l8.945-8.946c.23.49.383 1.015.45 1.553l.075.609.611.048a3.373 3.373 0 0 1-.267 6.736M3.222 18.23l1.074-1.073a3.357 3.357 0 0 1 1.812-6l.612-.047.074-.61a5.24 5.24 0 0 1 7.972-3.814l1.083-1.082A6.74 6.74 0 0 0 5.4 9.746a4.867 4.867 0 0 0-2.178 8.484" />
    </g>
    <defs>
      <clipPath id="cloud-offline_svg__a">
        <path d="M0 .644h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgCloudOffline);
export default Memo;
