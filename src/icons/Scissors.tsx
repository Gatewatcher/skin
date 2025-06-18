import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgScissors = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 17 17"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m13.285 9.925-3.13-1.815 3.13-1.815a2.5 2.5 0 0 0-.605-4.6 2.5 2.5 0 0 0-2.81 3.68 2.5 2.5 0 0 0 1.195 1.05L9.155 7.53l-7.12-4.12-.5.87 6.62 3.83-6.62 3.84.5.87 7.12-4.13 1.91 1.105a2.5 2.5 0 0 0-1.195 1.05 2.5 2.5 0 0 0 2.81 3.68 2.5 2.5 0 0 0 .605-4.6m-2.55-5.05a1.5 1.5 0 0 1 .55-2.06 1.5 1.5 0 0 1 2.05.555 1.5 1.5 0 0 1-1.689 2.205 1.5 1.5 0 0 1-.91-.7Zm2.6 8a1.5 1.5 0 0 1-2.494.168 1.5 1.5 0 0 1-.106-1.673 1.5 1.5 0 0 1 2.05-.55 1.5 1.5 0 0 1 .55 2.03z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgScissors);
export default Memo;
