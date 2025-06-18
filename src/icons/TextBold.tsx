import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgTextBold = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13.687 18.999H6.75v-13.5h6.375a3.938 3.938 0 0 1 3 6.488 3.938 3.938 0 0 1-2.438 7.012M9 16.749h4.672a1.688 1.688 0 1 0 0-3.375H9zm0-5.625h4.125a1.688 1.688 0 1 0 0-3.375H9z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgTextBold);
export default Memo;
