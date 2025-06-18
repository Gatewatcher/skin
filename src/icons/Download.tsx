import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgDownload = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19.5 18v3h-15v-3H3v3a1.5 1.5 0 0 0 1.5 1.5h15A1.5 1.5 0 0 0 21 21v-3zM19.5 10.5l-1.058-1.057-5.692 5.685V1.5h-1.5v13.628L5.558 9.442 4.5 10.5 12 18z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgDownload);
export default Memo;
