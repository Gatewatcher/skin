import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCloudServiceManagement = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#cloud-service-management_svg__a)" fill="currentColor">
      <path d="M21 12.75v3.75H3v-12h7.5V3H3a1.5 1.5 0 0 0-1.5 1.5v12A1.5 1.5 0 0 0 3 18h6v3H6v1.5h12V21h-3v-3h6a1.5 1.5 0 0 0 1.5-1.5v-3.75zM13.5 21h-3v-3h3z" />
      <path d="M22.5 7.5V6h-1.576a3.7 3.7 0 0 0-.549-1.315l1.118-1.117-1.06-1.06-1.118 1.117A3.7 3.7 0 0 0 18 3.075V1.5h-1.5v1.576c-.47.097-.916.283-1.315.549l-1.117-1.118-1.06 1.06 1.117 1.118A3.7 3.7 0 0 0 13.575 6H12v1.5h1.576c.096.47.283.916.549 1.315l-1.118 1.117 1.06 1.06 1.118-1.117c.4.266.845.453 1.315.55V12H18v-1.576c.47-.096.916-.283 1.315-.549l1.117 1.118 1.06-1.06-1.117-1.118c.266-.4.453-.846.55-1.315zM17.25 9a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5" />
    </g>
    <defs>
      <clipPath id="cloud-service-management_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgCloudServiceManagement);
export default Memo;
