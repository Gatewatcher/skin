import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgFileView = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.5 19.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"
      fill="currentColor"
    />
    <path
      d="M22.333 17.609A6.48 6.48 0 0 0 16.5 13.5a6.48 6.48 0 0 0-5.833 4.109L10.5 18l.167.391A6.48 6.48 0 0 0 16.5 22.5a6.48 6.48 0 0 0 5.833-4.109L22.5 18zM16.5 21a3 3 0 1 1 0-5.999 3 3 0 0 1 0 5.999"
      fill="currentColor"
    />
    <path
      d="M9 21H6V3h6v4.5A1.504 1.504 0 0 0 13.5 9H18v3h1.5V7.5a.68.68 0 0 0-.225-.525l-5.25-5.25A.68.68 0 0 0 13.5 1.5H6A1.504 1.504 0 0 0 4.5 3v18A1.504 1.504 0 0 0 6 22.5h3zm4.5-17.7 4.2 4.2h-4.2z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgFileView);
export default Memo;
