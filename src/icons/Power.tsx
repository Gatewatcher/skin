import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgPower = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 20 21"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g fill="currentColor">
      <path d="m13.75 4.643-.577 1.03a6.5 6.5 0 0 1 2.69 3.165 6.74 6.74 0 0 1 .267 4.2 6.56 6.56 0 0 1-2.267 3.5A6.22 6.22 0 0 1 10 17.893a6.22 6.22 0 0 1-3.863-1.353 6.56 6.56 0 0 1-2.267-3.5 6.74 6.74 0 0 1 .267-4.2 6.5 6.5 0 0 1 2.69-3.166l-.577-1.03a7.67 7.67 0 0 0-3.18 3.74 7.97 7.97 0 0 0-.314 4.965 7.76 7.76 0 0 0 2.678 4.137A7.35 7.35 0 0 0 10 19.084a7.35 7.35 0 0 0 4.566-1.6 7.76 7.76 0 0 0 2.678-4.136 7.97 7.97 0 0 0-.315-4.964 7.67 7.67 0 0 0-3.179-3.74" />
      <path d="M9.423 2.417h1.154v8.334H9.423z" />
    </g>
  </svg>
);
const Memo = memo(SvgPower);
export default Memo;
