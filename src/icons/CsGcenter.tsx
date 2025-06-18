import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCsGcenter = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g fill="currentColor">
      <path d="M16.44 5.282H4.5v1.5h11.94z" />
      <path
        clipRule="evenodd"
        d="M1.5 9.032c0 .827.673 1.5 1.5 1.5h18c.827 0 1.5-.673 1.5-1.5v-6c0-.828-.673-1.5-1.5-1.5H3c-.827 0-1.5.672-1.5 1.5zm1.5-6h18v6H3z"
        fillRule="evenodd"
      />
      <path d="M18.702 6.782a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5M16.44 15.745H4.5v1.51h11.94z" />
      <path d="M16.44 15.745H4.5v1.51h11.94zM19.452 16.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0" />
      <path
        clipRule="evenodd"
        d="M1.5 19.5c0 .827.673 1.5 1.5 1.5h18c.827 0 1.5-.673 1.5-1.5v-6c0-.827-.673-1.5-1.5-1.5H3c-.827 0-1.5.673-1.5 1.5zm1.5-6v6h18v-6z"
        fillRule="evenodd"
      />
    </g>
  </svg>
);
const Memo = memo(SvgCsGcenter);
export default Memo;
