import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgEmailLeak = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 33 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#email-leak_svg__a)" fill="currentColor">
      <path d="M19.5 24h-15L4.497 8.906l11.434 7.916a1 1 0 0 0 1.138 0L28.5 8.91v6.67h2V8a2.003 2.003 0 0 0-2-2h-24a2 2 0 0 0-2 2v16a2.003 2.003 0 0 0 2 2h15zm6.799-16L16.5 14.784 6.701 8z" />
      <path d="M26.5 28.473a3.9 3.9 0 0 1-4-3.777 3.9 3.9 0 0 1 .653-2.064l2.517-3.745a1.038 1.038 0 0 1 1.66 0l2.485 3.696a3.97 3.97 0 0 1 .685 2.113 3.9 3.9 0 0 1-4 3.777m0-7.236-1.656 2.462a1.9 1.9 0 0 0-.344.997 2.014 2.014 0 0 0 4 0 2 2 0 0 0-.375-1.046z" />
    </g>
    <defs>
      <clipPath id="email-leak_svg__a">
        <path d="M.5 0h32v32H.5z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgEmailLeak);
export default Memo;
