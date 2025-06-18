import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgStorageRequest = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3 15.75H1.5V18A1.505 1.505 0 0 0 3 19.5h2.25V18H3zM3 6h2.25V4.5H3A1.504 1.504 0 0 0 1.5 6v2.25H3zM17.25 4.5h-4.5V6h4.5zM11.25 4.5h-4.5V6h4.5zM17.25 18h-4.5v1.5h4.5zM21 11.25H3v-1.5H1.5v4.5H3v-1.5h18v1.5h1.5v-4.5H21zM21 18h-2.25v1.5H21a1.505 1.505 0 0 0 1.5-1.5v-2.25H21zM21 4.5h-2.25V6H21v2.25h1.5V6A1.505 1.505 0 0 0 21 4.5M11.25 18h-4.5v1.5h4.5zM5.25 9.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5M5.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgStorageRequest);
export default Memo;
