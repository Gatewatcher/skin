import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCsDarkMode = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 46 47"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#cs-dark-mode_svg__a)" fill="#F5F5F5">
      <path d="M21.534 4.813a1.4 1.4 0 0 0-.251.022 18.825 18.825 0 0 0 2.623 37.349c.236.008.471 0 .705 0a18.8 18.8 0 0 0 15.384-7.987 1.45 1.45 0 0 0-1.126-2.248A18.803 18.803 0 0 1 22.841 6.796a1.457 1.457 0 0 0-1.307-1.984" />
      <path d="m33.031 8 1.603 3.344 3.428.526-2.515 2.452 1.078 3.74-3.594-2.16-3.593 2.16 1.078-3.74L28 11.87l3.522-.526zM40.219 18.063l1.145 2.388 2.449.376-1.797 1.75.77 2.673-2.567-1.544-2.567 1.544.77-2.672-1.797-1.751 2.516-.376z" />
    </g>
    <defs>
      <clipPath id="cs-dark-mode_svg__a">
        <path d="M0 .5h46v46H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgCsDarkMode);
export default Memo;
