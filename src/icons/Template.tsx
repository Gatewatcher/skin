import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgTemplate = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19.5 4.5v3h-15v-3zm0-1.5h-15A1.5 1.5 0 0 0 3 4.5v3A1.5 1.5 0 0 0 4.5 9h15A1.5 1.5 0 0 0 21 7.5v-3A1.5 1.5 0 0 0 19.5 3M7.5 12v7.5h-3V12zm0-1.5h-3A1.5 1.5 0 0 0 3 12v7.5A1.5 1.5 0 0 0 4.5 21h3A1.5 1.5 0 0 0 9 19.5V12a1.5 1.5 0 0 0-1.5-1.5M19.5 12v7.5H12V12zm0-1.5H12a1.5 1.5 0 0 0-1.5 1.5v7.5A1.5 1.5 0 0 0 12 21h7.5a1.5 1.5 0 0 0 1.5-1.5V12a1.5 1.5 0 0 0-1.5-1.5"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgTemplate);
export default Memo;
