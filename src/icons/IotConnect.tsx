import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgIotConnect = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#iot-connect_svg__a)" fill="currentColor">
      <path d="M22.5 14.879h-3v-3H18v6.75H6v-12l6.75-.001v-1.5h-3v-3h-1.5v3H6a1.5 1.5 0 0 0-1.5 1.5v2.25h-3v1.5h3v4.5h-3v1.5h3v2.25a1.5 1.5 0 0 0 1.5 1.5h2.25v3h1.5v-3h4.5v3h1.5v-3H18a1.5 1.5 0 0 0 1.5-1.5v-2.25h3z" />
      <path d="M19.5 2.129a3.003 3.003 0 0 0-3 3c.003.534.15 1.057.425 1.514L14.69 8.88H8.25v7.5h7.5v-6.44l2.236-2.235c.457.275.98.422 1.514.425a3 3 0 0 0 0-6m-5.25 12.75h-4.5v-4.5h4.5zm5.25-8.25a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
    </g>
    <defs>
      <clipPath id="iot-connect_svg__a">
        <path d="M0 .629h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgIotConnect);
export default Memo;
