import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCircleCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m10.5 16.06-3.75-3.75 1.06-1.06 2.69 2.69 5.689-5.69 1.061 1.061z"
      fill="currentColor"
    />
    <path
      d="M12 1.5a10.5 10.5 0 1 0 0 21 10.5 10.5 0 0 0 0-21M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgCircleCheck);
export default Memo;
