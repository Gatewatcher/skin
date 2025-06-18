import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgFileCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m16.5 20.385-1.943-1.943L13.5 19.5l3 3 6-6-1.058-1.058z"
      fill="currentColor"
    />
    <path
      d="M11.25 21H6V3h6v4.5A1.504 1.504 0 0 0 13.5 9H18v4.5h1.5v-6a.68.68 0 0 0-.225-.525l-5.25-5.25A.68.68 0 0 0 13.5 1.5H6A1.504 1.504 0 0 0 4.5 3v18A1.504 1.504 0 0 0 6 22.5h5.25zM13.5 3.3l4.2 4.2h-4.2z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgFileCheck);
export default Memo;
