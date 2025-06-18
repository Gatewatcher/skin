import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgIdentity1 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#identity-1_svg__a)" fill="currentColor">
      <path d="M30 10h-2V4h-6V2h8zM4 10H2V2h8v2H4zM10 30H2v-8h2v6h6zM30 30h-8v-2h6v-6h2zM19.442 18.295h-6.884a3.443 3.443 0 0 0-3.442 3.442v2.295h2.294v-2.295a1.147 1.147 0 0 1 1.148-1.147h6.884a1.15 1.15 0 0 1 1.148 1.147v2.295h2.294v-2.295a3.44 3.44 0 0 0-3.442-3.442M16 17.147a4.59 4.59 0 1 0 0-9.179 4.59 4.59 0 0 0 0 9.18m0-6.884a2.295 2.295 0 1 1 0 4.59 2.295 2.295 0 0 1 0-4.59" />
    </g>
    <defs>
      <clipPath id="identity-1_svg__a">
        <path d="M0 0h32v32H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgIdentity1);
export default Memo;
