import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgNote = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.5 16.5V21h-12V3H12V1.5H4.5A1.5 1.5 0 0 0 3 3v18a1.5 1.5 0 0 0 1.5 1.5h12A1.5 1.5 0 0 0 18 21v-4.5z"
      fill="currentColor"
    />
    <path
      d="M22.155 4.32 19.68 1.845a1.2 1.2 0 0 0-1.68 0l-10.5 10.5V16.5h4.148L22.148 6a1.2 1.2 0 0 0 0-1.68zM11.025 15H9v-2.025l7.08-7.088 2.033 2.033zm8.145-8.138L17.137 4.83l1.703-1.703 2.032 2.033z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgNote);
export default Memo;
