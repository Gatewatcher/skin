import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgEnterprise = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7.5 6H6v3h1.5zM7.5 10.5H6v3h1.5zM12 6h-1.5v3H12zM12 10.5h-1.5v3H12zM7.5 15H6v3h1.5zM12 15h-1.5v3H12z"
      fill="currentColor"
    />
    <path
      d="M22.5 10.5A1.5 1.5 0 0 0 21 9h-4.5V3A1.5 1.5 0 0 0 15 1.5H3A1.5 1.5 0 0 0 1.5 3v19.5h21zM3 3h12v18H3zm13.5 18V10.5H21V21z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgEnterprise);
export default Memo;
