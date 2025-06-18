import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCsDocumentationExternal = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#cs-documentation-external_svg__a)" fill="currentColor">
      <path d="M17.25 2.25v1.5h2.69l-4.19 4.19L16.81 9 21 4.81V7.5h1.5V2.25zM4.5 16.5h5.25V15H4.5zM14.25 16.5h5.25V15h-5.25zM4.5 12.75h5.25v-1.5H4.5zM14.25 12.75h5.25v-1.5h-5.25zM4.5 9h5.25V7.5H4.5z" />
      <path d="M3 20.25h18a1.5 1.5 0 0 0 1.5-1.5v-7.5H21v7.5h-8.25v-15H3a1.5 1.5 0 0 0-1.5 1.5v13.5a1.5 1.5 0 0 0 1.5 1.5m8.25-15v13.5H3l-.001-13.5z" />
    </g>
    <defs>
      <clipPath id="cs-documentation-external_svg__a">
        <path d="M24 24H0V0h24z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgCsDocumentationExternal);
export default Memo;
