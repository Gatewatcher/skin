import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCloudLock = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#cloud-lock_svg__a)" fill="currentColor">
      <path d="M15 15v-2.25a3 3 0 0 0-6 0V15a1.5 1.5 0 0 0-1.5 1.5V21A1.5 1.5 0 0 0 9 22.5h6a1.5 1.5 0 0 0 1.5-1.5v-4.5A1.5 1.5 0 0 0 15 15m-4.5-2.25a1.5 1.5 0 1 1 3 0V15h-3zM9 21v-4.5h6V21z" />
      <path d="M19.372 7.586a7.506 7.506 0 0 0-8.883-5.933 7.5 7.5 0 0 0-5.862 5.933 5.627 5.627 0 0 0 .991 11.164H6v-1.5h-.379a4.127 4.127 0 0 1-.727-8.187l1.012-.183.194-1.01a6.008 6.008 0 0 1 11.799 0l.194 1.01 1.012.183a4.126 4.126 0 0 1-.724 8.187H18v1.5h.38a5.626 5.626 0 0 0 .992-11.164" />
    </g>
    <defs>
      <clipPath id="cloud-lock_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgCloudLock);
export default Memo;
