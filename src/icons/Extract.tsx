import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgExtract = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 16 17"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g fill="currentColor">
      <path d="M6.5 10.527h6.585l-1.29 1.295.705.705 2.5-2.5-2.5-2.5-.705.705 1.29 1.295H6.5z" />
      <path d="M11 7.027v-2a.5.5 0 0 0-.145-.355l-3.5-3.5A.5.5 0 0 0 7 1.027H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h-1v1H2v-12h4v3a1 1 0 0 0 1 1h3v1zm-4-2V2.232l2.795 2.795z" />
    </g>
  </svg>
);
const Memo = memo(SvgExtract);
export default Memo;
