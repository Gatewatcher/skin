import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgExpand = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14.5 2v1.5h4.94L13 9.94 14.06 11l6.44-6.44V9.5H22V2zM9.5 22v-1.5H4.56L11 14.06 9.94 13 3.5 19.44V14.5H2V22z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgExpand);
export default Memo;
