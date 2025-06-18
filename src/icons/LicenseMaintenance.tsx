import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgLicenseMaintenance = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#license-maintenance_svg__a)" fill="currentColor">
      <path d="M10.5 10.5H6V12h4.5zM15 4.5H6V6h9zM15 7.5H6V9h9zM10.5 18H6v1.5h4.5zM22.5 18v-1.5h-1.576a3.7 3.7 0 0 0-.549-1.315l1.118-1.117-1.06-1.06-1.118 1.117a3.7 3.7 0 0 0-1.315-.55V12h-1.5v1.576c-.47.096-.916.283-1.315.549l-1.117-1.118-1.06 1.06 1.117 1.118a3.7 3.7 0 0 0-.55 1.315H12V18h1.576c.096.47.283.916.549 1.315l-1.118 1.117 1.06 1.06 1.118-1.117c.4.266.845.453 1.315.55V22.5H18v-1.576c.47-.096.916-.283 1.315-.549l1.117 1.118 1.06-1.06-1.117-1.118c.266-.4.453-.846.55-1.315zm-5.25 1.5a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5" />
      <path d="M10.5 22.5h-6A1.5 1.5 0 0 1 3 21V3a1.5 1.5 0 0 1 1.5-1.5h12A1.5 1.5 0 0 1 18 3v7.5h-1.5V3h-12v18h6z" />
    </g>
    <defs>
      <clipPath id="license-maintenance_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgLicenseMaintenance);
export default Memo;
