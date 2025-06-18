import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgDatabaseReload = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.25 6a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5M5.25 12a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5M5.25 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5"
      fill="currentColor"
    />
    <path
      d="M9 19.5H3V15h6v-1.5H3V9h13.5V3A1.5 1.5 0 0 0 15 1.5H3A1.5 1.5 0 0 0 1.5 3v16.5A1.5 1.5 0 0 0 3 21h6zM3 3h12v4.5H3z"
      fill="currentColor"
    />
    <path
      d="M21 12.75v1.81a5.248 5.248 0 1 0-4.5 7.94V21a3.75 3.75 0 1 1 3.432-5.25H18v1.5h4.5v-4.5z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgDatabaseReload);
export default Memo;
