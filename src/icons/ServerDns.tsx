import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgServerDns = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 25 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#server-dns_svg__a)" fill="currentColor">
      <path d="M12.5 2a6 6 0 1 0 6 6 6.007 6.007 0 0 0-6-6m4.433 5.25h-1.829a11.4 11.4 0 0 0-.593-3.27 4.5 4.5 0 0 1 2.422 3.27m-4.416 5.25h-.006c-.286-.091-.982-1.367-1.11-3.75H13.6c-.128 2.382-.82 3.658-1.082 3.75m-1.115-5.25c.127-2.382.82-3.658 1.082-3.75h.005c.286.091.982 1.367 1.11 3.75zm-.912-3.27a11.4 11.4 0 0 0-.594 3.27H8.068a4.5 4.5 0 0 1 2.422-3.27M8.067 8.75h1.827c.038 1.113.238 2.215.594 3.27a4.5 4.5 0 0 1-2.421-3.27m6.442 3.27c.356-1.055.556-2.157.594-3.27h1.829a4.5 4.5 0 0 1-2.423 3.27M21.5 23h-18A1.5 1.5 0 0 1 2 21.5V17a1.5 1.5 0 0 1 1.5-1.5h18A1.5 1.5 0 0 1 23 17v4.5a1.5 1.5 0 0 1-1.5 1.5m-18-6v4.5h18V17z" />
      <path d="M5.75 20a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5" />
    </g>
    <defs>
      <clipPath id="server-dns_svg__a">
        <path d="M.5.5h24v24H.5z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgServerDns);
export default Memo;
