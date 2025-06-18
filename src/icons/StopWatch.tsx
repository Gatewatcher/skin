import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgStopWatch = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g fill="currentColor">
      <path d="M10.625 6.875h-1.25V12.5h1.25zm1.25-5.625h-3.75V2.5h3.75z" />
      <path d="m17.5 5.625-.888-.881-1.406 1.406a6.84 6.84 0 0 0-4.52-2.33 6.838 6.838 0 0 0-6.21 10.783 6.84 6.84 0 0 0 4.285 2.74 6.84 6.84 0 0 0 4.991-.977 6.84 6.84 0 0 0 2.936-4.153 6.84 6.84 0 0 0-.744-5.032zM10 16.25a5.63 5.63 0 0 1-3.125-.948 5.63 5.63 0 0 1-2.072-2.524 5.625 5.625 0 0 1 1.22-6.13 5.625 5.625 0 0 1 9.602 3.977A5.625 5.625 0 0 1 10 16.25" />
    </g>
  </svg>
);
const Memo = memo(SvgStopWatch);
export default Memo;
