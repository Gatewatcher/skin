import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgPackage = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M2.25 17.5V7a.75.75 0 0 1 .372-.648l9-5.25a.75.75 0 0 1 .756 0l9 5.25A.75.75 0 0 1 21.75 7v10.5a.75.75 0 0 1-.372.648l-9 5.25a.75.75 0 0 1-.756 0l-9-5.25a.75.75 0 0 1-.372-.648m1.5-.43V8.256l7.5 4.243v8.944l-7.5-4.375Zm9 4.374 7.5-4.375V8.257l-7.5 4.243zm6.719-14.469L12 11.201 4.531 6.975 12 2.618z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);
const Memo = memo(SvgPackage);
export default Memo;
