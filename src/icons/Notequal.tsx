import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgNotequal = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M20 7.955H4V9.67h16zM20 14.241H4v1.714h16z" fill="currentColor" />
    <path d="m15.2 4.956-8 13.856 1.485.857 8-13.856z" fill="currentColor" />
  </svg>
);
const Memo = memo(SvgNotequal);
export default Memo;
