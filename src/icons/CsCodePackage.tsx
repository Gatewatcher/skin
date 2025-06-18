import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCsCodePackage = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#cs-code-package_svg__a)" fill="currentColor">
      <path d="M1.5 13.5V15H3v6c0 .827.673 1.5 1.5 1.5h15c.827 0 1.5-.673 1.5-1.5v-6h1.5v-1.5zm18 7.5h-15v-6h15zM9.75 6h-1.5v6h1.5zM6.75 6h-1.5v6h1.5zM18.75 6h-1.5v4.5h1.5zM14.25 12h-1.5a1.5 1.5 0 0 1-1.5-1.5v-3a1.5 1.5 0 0 1 1.5-1.5h1.5a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5m-1.5-1.5h1.5v-3h-1.5zM6.75 1.5h-1.5v3h1.5zM15.75 1.5h-1.5v3h1.5zM18.75 1.5h-1.5v3h1.5zM11.25 4.5h-1.5A1.5 1.5 0 0 1 8.25 3V1.5h1.5V3h1.5V1.5h1.5V3a1.5 1.5 0 0 1-1.5 1.5" />
      <path d="M14.25 16.5h-4.5V18h4.5z" />
    </g>
    <defs>
      <clipPath id="cs-code-package_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgCsCodePackage);
export default Memo;
