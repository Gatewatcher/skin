import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgChevronDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 16.5 4.5 9l1.05-1.05L12 14.4l6.45-6.45L19.5 9z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgChevronDown);
export default Memo;
