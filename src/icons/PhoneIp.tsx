import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgPhoneIp = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#phone-ip_svg__a)" fill="currentColor">
      <path d="M13.5 11.129H12v1.5h1.5zM16.5 11.129H15v1.5h1.5zM19.5 11.129H18v1.5h1.5zM13.5 14.129H12v1.5h1.5zM16.5 14.129H15v1.5h1.5zM19.5 14.129H18v1.5h1.5zM13.5 17.129H12v1.5h1.5zM16.5 17.129H15v1.5h1.5zM19.5 17.129H18v1.5h1.5zM19.5 8.129H12v1.5h7.5z" />
      <path d="M21 5.129H10.5v-.75a1.5 1.5 0 0 0-1.5-1.5H6a1.5 1.5 0 0 0-1.5 1.5v.75H3a1.5 1.5 0 0 0-1.5 1.5v13.5a1.5 1.5 0 0 0 1.5 1.5h18a1.5 1.5 0 0 0 1.5-1.5v-13.5a1.5 1.5 0 0 0-1.5-1.5m-15-.75h3v12.75H6zm15 15.75H3v-13.5h1.5v10.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-10.5H21z" />
    </g>
    <defs>
      <clipPath id="phone-ip_svg__a">
        <path d="M0 .629h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgPhoneIp);
export default Memo;
