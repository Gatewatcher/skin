import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgManagedSolutions = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M22.5 17.894h-3.75v-3.75h-1.5v3.75H13.5v1.5h3.75v3.75h1.5v-3.75h3.75z"
      fill="currentColor"
    />
    <path
      d="m18.096 9.523.885.16a4.34 4.34 0 0 1 1.968.859 4.07 4.07 0 0 1 1.516 3.601h1.522a5.627 5.627 0 0 0-4.613-5.913 7.506 7.506 0 0 0-8.882-5.934A7.5 7.5 0 0 0 4.63 8.23a5.63 5.63 0 0 0-4.587 6.22 5.76 5.76 0 0 0 5.786 4.944H10.5v-1.5H5.773a4.224 4.224 0 0 1-4.201-3.365 4.13 4.13 0 0 1 3.325-4.823l1.011-.183.16-.832a6.155 6.155 0 0 1 5.058-4.982 6 6 0 0 1 2.26.097 6.11 6.11 0 0 1 4.54 4.835z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgManagedSolutions);
export default Memo;
