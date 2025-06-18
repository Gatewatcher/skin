import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgServerProxy = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#server-proxy_svg__a)" fill="currentColor">
      <path d="M4.5 22.5h15A1.5 1.5 0 0 0 21 21v-4.5a1.5 1.5 0 0 0-1.5-1.5h-15A1.5 1.5 0 0 0 3 16.5V21a1.5 1.5 0 0 0 1.5 1.5m0-6h15V21h-15z" />
      <path d="M6.75 19.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5M19.5 1.5l-1.058 1.058L20.379 4.5h-3.642a5.237 5.237 0 0 0-9.926 3H3.623l1.935-1.942L4.5 4.5.75 8.25 4.5 12l1.058-1.057L3.623 9h3.64a5.237 5.237 0 0 0 9.927-3h3.188l-1.936 1.943L19.5 9l3.75-3.75zm-3.75 5.25A3.737 3.737 0 0 1 9.02 9H12V7.5H8.326a3.739 3.739 0 0 1 6.655-3H12V6h3.674q.076.371.076.75" />
    </g>
    <defs>
      <clipPath id="server-proxy_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgServerProxy);
export default Memo;
