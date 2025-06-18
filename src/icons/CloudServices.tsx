import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCloudServices = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 25 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#cloud-services_svg__a)" fill="currentColor">
      <path d="M19.491 7.593a7.5 7.5 0 0 0-14.732 0A5.622 5.622 0 0 0 5.75 18.75h.375v-1.5H5.75a4.122 4.122 0 0 1-.283-8.235l.628-.043.067-.625a5.998 5.998 0 0 1 11.926 0l.068.625.627.043a4.122 4.122 0 0 1-.283 8.235h-.375v1.5h.375a5.622 5.622 0 0 0 .991-11.157" />
      <path d="M17.375 16.5V15h-1.576a3.7 3.7 0 0 0-.549-1.315l1.118-1.117-1.06-1.06-1.118 1.117a3.7 3.7 0 0 0-1.315-.55V10.5h-1.5v1.576c-.47.096-.916.283-1.315.549l-1.117-1.118-1.06 1.06L9 13.686A3.7 3.7 0 0 0 8.45 15H6.876v1.5h1.576c.097.47.283.916.549 1.315l-1.118 1.117 1.06 1.06 1.118-1.117c.4.266.845.452 1.315.55V21h1.5v-1.576c.47-.097.916-.283 1.315-.549l1.117 1.118 1.06-1.06-1.117-1.118c.266-.4.452-.846.55-1.315zm-5.25 1.5a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5" />
    </g>
    <defs>
      <clipPath id="cloud-services_svg__a">
        <path d="M.125 0h24v24h-24z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgCloudServices);
export default Memo;
