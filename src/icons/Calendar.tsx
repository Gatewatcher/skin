import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCalendar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19.5 3h-3V1.5H15V3H9V1.5H7.5V3h-3C3.675 3 3 3.675 3 4.5v15c0 .825.675 1.5 1.5 1.5h15c.825 0 1.5-.675 1.5-1.5v-15c0-.825-.675-1.5-1.5-1.5m0 16.5h-15V9h15zm0-12h-15v-3h3V6H9V4.5h6V6h1.5V4.5h3z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgCalendar);
export default Memo;
