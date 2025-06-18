import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgIdentity = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#identity_svg__a)" fill="currentColor">
      <path d="M14 26H4V6h7.17l3.42 3.41.58.59H28v8h2v-8a2 2 0 0 0-2-2H16l-3.41-3.41A2 2 0 0 0 11.17 4H4a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h10z" />
      <path d="m30.486 27.972-6.068-11.168a.694.694 0 0 0-1.213 0l-6.068 11.168a.695.695 0 0 0 .61 1.028h12.129a.695.695 0 0 0 .61-1.028m-7.399-7.663h1.449v3.863h-1.449zm.724 6.76a.966.966 0 1 1 0-1.932.966.966 0 0 1 0 1.932" />
    </g>
    <defs>
      <clipPath id="identity_svg__a">
        <path d="M0 0h32v32H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgIdentity);
export default Memo;
