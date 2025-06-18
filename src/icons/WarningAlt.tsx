import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgWarningAlt = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 17.25a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25M12.75 9h-1.5v6.75h1.5z"
      fill="currentColor"
    />
    <path
      d="M21.75 22.5H2.25a.75.75 0 0 1-.665-1.096l9.75-18.75a.75.75 0 0 1 1.33 0l9.75 18.75a.75.75 0 0 1-.665 1.096M3.488 21h17.024l.002-.003L12.002 4.63h-.004L3.488 20.997z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgWarningAlt);
export default Memo;
