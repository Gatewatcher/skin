import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgIdentification = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 17 17"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14.5 3.125v10h-12v-10zm0-1h-12a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-10a1 1 0 0 0-1-1"
      fill="currentColor"
    />
    <path
      d="M7 5.125H3.5v1H7zM5.5 7.125h-2v1h2zM12 9.125H9a1.5 1.5 0 0 0-1.5 1.5v1h1v-1a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1h1v-1a1.5 1.5 0 0 0-1.5-1.5M10.5 8.625a2 2 0 1 0 0-4 2 2 0 0 0 0 4m0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgIdentification);
export default Memo;
