import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgTextItalic = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18.75 6.999v-1.5H9v1.5h3.855l-3.278 10.5H5.25v1.5H15v-1.5h-3.855l3.277-10.5z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgTextItalic);
export default Memo;
