import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCsStorageUnlock = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#cs-storage-unlock_svg__a)" fill="currentColor">
      <path d="M21 15h-3v1.5h3V21H3v-4.5h3V15H3a1.5 1.5 0 0 0-1.5 1.5V21A1.5 1.5 0 0 0 3 22.5h18a1.5 1.5 0 0 0 1.5-1.5v-4.5A1.5 1.5 0 0 0 21 15" />
      <path d="M5.25 19.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5M15 8.25h-4.5V6a1.5 1.5 0 1 1 3 0H15a3 3 0 0 0-6 0v2.25a1.5 1.5 0 0 0-1.5 1.5v3.75A1.5 1.5 0 0 0 9 15h6a1.5 1.5 0 0 0 1.5-1.5V9.75a1.5 1.5 0 0 0-1.5-1.5M9 13.5V9.75h6v3.75z" />
    </g>
    <defs>
      <clipPath id="cs-storage-unlock_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgCsStorageUnlock);
export default Memo;
