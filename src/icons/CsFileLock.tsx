import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCsFileLock = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#cs-file-lock_svg__a)" fill="currentColor">
      <path d="m23.499 9.085-6.792-6.792A1 1 0 0 0 16 2H6a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h8v-2H6V4h8v6a2 2 0 0 0 2 2h6.292a1.708 1.708 0 0 0 1.207-2.915M16 10V4.414L21.585 10z" />
      <path d="M28 21h-6v-3a2 2 0 0 1 4 0h2a4 4 0 1 0-8 0v3a2.003 2.003 0 0 0-2 2v5a2.003 2.003 0 0 0 2 2h8a2.003 2.003 0 0 0 2-2v-5a2.003 2.003 0 0 0-2-2m-8 7v-5h8v5z" />
    </g>
    <defs>
      <clipPath id="cs-file-lock_svg__a">
        <path d="M0 0h32v32H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgCsFileLock);
export default Memo;
