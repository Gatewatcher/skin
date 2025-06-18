import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgFileDownload = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m22.5 18.75-1.06-1.06-1.94 1.939V13.5H18v6.129l-1.94-1.94L15 18.75l3.75 3.75z"
      fill="currentColor"
    />
    <path
      d="M13.5 21H6V3h6v4.5A1.504 1.504 0 0 0 13.5 9H18v2.25h1.5V7.5a.68.68 0 0 0-.225-.525l-5.25-5.25A.68.68 0 0 0 13.5 1.5H6A1.504 1.504 0 0 0 4.5 3v18A1.504 1.504 0 0 0 6 22.5h7.5zm0-17.7 4.2 4.2h-4.2z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgFileDownload);
export default Memo;
