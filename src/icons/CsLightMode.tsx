import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCsLightMode = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 46 47"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#cs-light-mode_svg__a)" fill="#F2D179">
      <path d="M24.438 3.375h-2.875v7.188h2.875zM36.214 8.253l-5.04 5.04 2.033 2.033 5.04-5.04zM43.125 22.063h-7.187v2.875h7.187zM33.207 31.674l-2.033 2.033 5.04 5.04 2.033-2.033zM24.438 36.438h-2.875v7.187h2.875zM12.793 31.674l-5.04 5.04 2.033 2.033 5.04-5.04zM10.063 22.063H2.875v2.875h7.188zM9.786 8.253l-2.033 2.033 5.04 5.04 2.033-2.033zM23 14.875a8.624 8.624 0 1 0 0 17.249 8.624 8.624 0 0 0 0-17.249" />
    </g>
    <defs>
      <clipPath id="cs-light-mode_svg__a">
        <path d="M0 .5h46v46H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgCsLightMode);
export default Memo;
