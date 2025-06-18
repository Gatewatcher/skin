import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgExternalAssetsLock = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 32 33"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#external-assets-lock_svg__a)" fill="currentColor">
      <path d="M22.175 10.706 23.76 9.44a9.95 9.95 0 0 0-9.775-3.53A10 10 0 0 0 6.17 13.82a7.506 7.506 0 0 0-6.116 8.294 7.684 7.684 0 0 0 7.715 6.591H16v-2H7.694a5.63 5.63 0 0 1-5.602-4.486 5.506 5.506 0 0 1 4.434-6.43l1.349-.245.214-1.11a8.21 8.21 0 0 1 6.742-6.642 8 8 0 0 1 3.014.13 7.8 7.8 0 0 1 4.33 2.783" />
      <path d="M29 20.265h-6v-3a2 2 0 1 1 4 0h2a4 4 0 1 0-8 0v3a2 2 0 0 0-2 2v5a2.003 2.003 0 0 0 2 2h8a2.003 2.003 0 0 0 2-2v-5a2.003 2.003 0 0 0-2-2m-8 7v-5h8v5z" />
    </g>
    <defs>
      <clipPath id="external-assets-lock_svg__a">
        <path d="M0 .706h32v32H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgExternalAssetsLock);
export default Memo;
