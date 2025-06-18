import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgFileStorage = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#file-storage_svg__a)" fill="currentColor">
      <path d="M21 15h-1.5v1.5H21V21H3v-4.5h1.5V15H3a1.5 1.5 0 0 0-1.5 1.5V21A1.5 1.5 0 0 0 3 22.5h18a1.5 1.5 0 0 0 1.5-1.5v-4.5A1.5 1.5 0 0 0 21 15" />
      <path d="M5.25 19.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5M17.03 5.47l-3.75-3.75a.75.75 0 0 0-.53-.22h-4.5A1.5 1.5 0 0 0 6.75 3v12a1.5 1.5 0 0 0 1.5 1.5h7.5a1.5 1.5 0 0 0 1.5-1.5V6a.75.75 0 0 0-.22-.53M15.44 6h-2.69V3.31zm-7.19 9V3h3v3a1.5 1.5 0 0 0 1.5 1.5h3V15z" />
    </g>
    <defs>
      <clipPath id="file-storage_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgFileStorage);
export default Memo;
