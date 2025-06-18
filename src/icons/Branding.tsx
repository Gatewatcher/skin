import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgBranding = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 32 33"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#branding_svg__a)" fill="currentColor">
      <path d="M19.967 14.769h-2v3.036h2zM23.5 26.956a1.875 1.875 0 1 0 0-3.75 1.875 1.875 0 0 0 0 3.75" />
      <path d="M30.79 24.592c-1.333-3.12-4.195-5.136-7.29-5.136s-5.957 2.015-7.29 5.136l-.21.489.21.489c1.333 3.12 4.195 5.136 7.29 5.136s5.957-2.016 7.29-5.136l.21-.49zm-7.29 4.239a3.754 3.754 0 0 1-3.75-3.75 3.754 3.754 0 0 1 3.75-3.75 3.754 3.754 0 0 1 3.75 3.75 3.754 3.754 0 0 1-3.75 3.75M14.05 8.75h-2v4h2zM14.05 14.769h-2v4h2zM14.05 20.706h-2v4h2zM19.967 8.75h-2v4h2z" />
      <path d="M8.008 28.706h5.763v2H8.198c-1.229 0-2.229-.898-2.229-2v-24c0-1.103 1-2 2.23-2h15.603c1.228 0 2.229.897 2.229 2v11h-2.06v-7h-.001v-2h.002v-2H8.014v2h.002v2h-.01z" />
    </g>
    <defs>
      <clipPath id="branding_svg__a">
        <path d="M0 .706h32v32H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgBranding);
export default Memo;
