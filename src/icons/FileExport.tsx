import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgFileExport = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9.75 15.75h9.878l-1.936 1.942 1.058 1.058L22.5 15l-3.75-3.75-1.058 1.057 1.936 1.943H9.75z"
      fill="currentColor"
    />
    <path
      d="M16.5 10.5v-3a.75.75 0 0 0-.218-.532l-5.25-5.25A.75.75 0 0 0 10.5 1.5H3A1.5 1.5 0 0 0 1.5 3v18A1.5 1.5 0 0 0 3 22.5h12a1.5 1.5 0 0 0 1.5-1.5v-1.5H15V21H3V3h6v4.5A1.5 1.5 0 0 0 10.5 9H15v1.5zm-6-3V3.308L14.693 7.5z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgFileExport);
export default Memo;
