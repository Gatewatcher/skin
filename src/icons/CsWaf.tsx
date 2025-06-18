import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCsWaf = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18.75 7.5H3A1.5 1.5 0 0 1 1.5 6V3A1.5 1.5 0 0 1 3 1.5h15.75a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5M3 3v3h15.75V3zM21 15H5.25a1.5 1.5 0 0 1-1.5-1.5v-3A1.5 1.5 0 0 1 5.25 9H21a1.5 1.5 0 0 1 1.5 1.5v3A1.5 1.5 0 0 1 21 15M5.25 10.5v3H21v-3zM18.75 22.5H3A1.5 1.5 0 0 1 1.5 21v-3A1.5 1.5 0 0 1 3 16.5h15.75a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5M3 18v3h15.75v-3z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgCsWaf);
export default Memo;
