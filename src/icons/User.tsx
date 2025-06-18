import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgUser = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 3a3.75 3.75 0 1 1 0 7.5A3.75 3.75 0 0 1 12 3m0-1.5A5.25 5.25 0 1 0 12 12a5.25 5.25 0 0 0 0-10.5M19.5 22.5H18v-3.75A3.75 3.75 0 0 0 14.25 15h-4.5A3.75 3.75 0 0 0 6 18.75v3.75H4.5v-3.75a5.25 5.25 0 0 1 5.25-5.25h4.5a5.25 5.25 0 0 1 5.25 5.25z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgUser);
export default Memo;
