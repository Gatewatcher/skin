import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgMaximize = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11.796 21.05h.05v-9.1H.7v9.1h11.096Zm11.454 0h.05V2.95H.7v7.6h1.6v-6h19.4v14.9h-8.25v1.6h9.8Zm-13.004-1.6H2.3v-5.9h7.946z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={0.1}
    />
  </svg>
);
const Memo = memo(SvgMaximize);
export default Memo;
