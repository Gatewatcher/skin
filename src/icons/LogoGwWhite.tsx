import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgLogoGwWhite = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 148 148"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#logo-gw-white_svg__a)" fill="#fff">
      <path d="M73.9 134.2c18 0 34.2-7.9 45.2-20.4l11.7 7.2c-13.6 16.3-34 26.7-56.9 26.7-26.6 0-49.9-14.1-63-35.2l11.5-7.1c10.8 17.3 29.8 28.8 51.5 28.8M73.9 13.5c18 0 34.2 7.9 45.2 20.4l11.7-7.2C117.2 10.4 96.8 0 73.9 0 47.3 0 24 14.1 10.9 35.2l11.5 7.1C33.2 25 52.2 13.5 73.9 13.5M134.3 73.8c0 11.6-3.3 22.4-8.9 31.499l11.5 7.1c6.9-11.2 10.9-24.5 10.9-38.6s-4-27.4-10.9-38.6l-11.5 7.1c5.7 9.2 8.9 20 8.9 31.5M117.4 47.6l-11.3 6.9c3.4 5.6 5.3 12.2 5.3 19.3s-2.1 14.1-5.7 19.8l11.3 6.9c4.8-7.8 7.6-16.9 7.6-26.7.1-9.6-2.6-18.5-7.2-26.2M6.1 44.4c-3.9 9-6.1 19-6.1 29.4s2.2 20.4 6.1 29.4l48.1-29.4z" />
      <path d="M73.9 45.9c-10.1 0-18.9 5.4-23.8 13.4l23.8 14.5-23.8 14.5c4.9 8 13.7 13.3 23.8 13.3 15.4 0 27.9-12.5 27.9-27.9 0-15.3-12.5-27.8-27.9-27.8" />
    </g>
    <defs>
      <clipPath id="logo-gw-white_svg__a">
        <path d="M0 0h147.8v147.7H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgLogoGwWhite);
export default Memo;
