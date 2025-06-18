import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgFileImport = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M21 14.25h-9.877l1.935-1.943L12 11.25 8.25 15 12 18.75l1.057-1.058-1.934-1.942H21z"
      fill="currentColor"
    />
    <path
      d="M18 10.5v-3a.75.75 0 0 0-.218-.532l-5.25-5.25A.75.75 0 0 0 12 1.5H4.5A1.5 1.5 0 0 0 3 3v18a1.5 1.5 0 0 0 1.5 1.5h12A1.5 1.5 0 0 0 18 21v-1.5h-1.5V21h-12V3h6v4.5A1.5 1.5 0 0 0 12 9h4.5v1.5zm-6-3V3.308L16.192 7.5z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgFileImport);
export default Memo;
