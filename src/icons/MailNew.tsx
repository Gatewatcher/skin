import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgMailNew = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14.25 18H3L2.997 6.68l8.576 5.937a.75.75 0 0 0 .854 0L21 6.682V13.5h1.5V6A1.5 1.5 0 0 0 21 4.5H3A1.5 1.5 0 0 0 1.5 6v12A1.5 1.5 0 0 0 3 19.5h11.25zm5.099-12L12 11.088 4.651 6z"
      fill="currentColor"
    />
    <path d="M19.5 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6" fill="currentColor" />
  </svg>
);
const Memo = memo(SvgMailNew);
export default Memo;
