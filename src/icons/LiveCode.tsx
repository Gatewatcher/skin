import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgLiveCode = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.749 3.249h4.5a1.5 1.5 0 0 1 1.5 1.5v15a1.5 1.5 0 0 1-1.5 1.5h-4.5a1.5 1.5 0 0 1-1.5-1.5v-15a1.5 1.5 0 0 1 1.5-1.5m4.5 16.5v-15h-4.5v15zM2.751 3.249h4.5a1.5 1.5 0 0 1 1.5 1.5v15a1.5 1.5 0 0 1-1.5 1.5h-4.5a1.5 1.5 0 0 1-1.5-1.5v-15a1.5 1.5 0 0 1 1.5-1.5m4.5 16.5v-15h-4.5v15zM11.251 21.249h1.498v-18h-1.498z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgLiveCode);
export default Memo;
