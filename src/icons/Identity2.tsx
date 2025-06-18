import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgIdentity2 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 33 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#identity-2_svg__a)" fill="currentColor">
      <path d="M28.5 6h-24a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2m-8 18h-8v-2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1zm8 0h-6v-2a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3v2h-6V8h24z" />
      <path d="M16.5 18a4 4 0 1 0 0-8 4 4 0 0 0 0 8m0-6a2 2 0 1 1 0 4 2 2 0 0 1 0-4" />
    </g>
    <defs>
      <clipPath id="identity-2_svg__a">
        <path d="M.5 0h32v32H.5z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgIdentity2);
export default Memo;
