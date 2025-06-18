import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCloudData = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#cloud-data_svg__a)" fill="currentColor">
      <path d="M15 9.75H9a1.5 1.5 0 0 0-1.5 1.5V21A1.5 1.5 0 0 0 9 22.5h6a1.5 1.5 0 0 0 1.5-1.5v-9.75a1.5 1.5 0 0 0-1.5-1.5m0 1.5v2.25H9v-2.25zM15 15v2.25H9V15zm-6 6v-2.25h6V21z" />
      <path d="M19.433 7.598a.09.09 0 0 1-.073-.072 7.505 7.505 0 0 0-5.942-5.89 7.5 7.5 0 0 0-8.779 5.89.09.09 0 0 1-.072.072A5.626 5.626 0 0 0 5.618 18.75H6v-1.5h-.378a4.132 4.132 0 0 1-4.08-4.725A4.275 4.275 0 0 1 5.079 9.03l.762-.138a.1.1 0 0 0 .079-.078l.135-.701a6.21 6.21 0 0 1 5.135-5.057 6 6 0 0 1 2.135.093 6.17 6.17 0 0 1 4.61 4.909l.146.756a.1.1 0 0 0 .079.078l.793.143a4.34 4.34 0 0 1 2.326 1.155 4.128 4.128 0 0 1-2.897 7.06H18v1.5h.38a5.627 5.627 0 0 0 1.053-11.152" />
    </g>
    <defs>
      <clipPath id="cloud-data_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgCloudData);
export default Memo;
