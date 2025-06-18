import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgUpdate = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M21 12.776c-.295 12.631-18.672 12.622-19 .027h1.355c.41 11.085 16.387 10.703 16.28-.382-.11-3.268-2.36-6.302-5.438-7.349-3.03-1.101-6.63-.169-8.75 2.272h3.339v1.364H3.357V3.249h1.357v2.89c3.836-4.102 10.813-3.747 14.22.716A9.56 9.56 0 0 1 21 12.775"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);
const Memo = memo(SvgUpdate);
export default Memo;
