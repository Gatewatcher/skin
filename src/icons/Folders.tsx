import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgFolders = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19.5 21h-15A1.5 1.5 0 0 1 3 19.5V8.25a1.5 1.5 0 0 1 1.5-1.5h4.25c.325 0 .64.106.9.3L12.25 9h7.25a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5M8.75 8.25H4.499L4.5 19.5h15v-9h-7.75zM21 6.75h-7.75l-3-2.25H4.5V3h5.75c.325 0 .64.106.9.3l2.6 1.95H21z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgFolders);
export default Memo;
