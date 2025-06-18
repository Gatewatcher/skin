import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgChevronUpWithoutBox = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11.5 7.5 19 15l-1.05 1.05L11.5 9.6l-6.45 6.45L4 15z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgChevronUpWithoutBox);
export default Memo;
