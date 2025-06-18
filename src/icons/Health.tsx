import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgHealth = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9 21.75a.75.75 0 0 1-.69-.465L4.747 12.75H1.5v-1.5h3.75a.75.75 0 0 1 .69.465L9 18.96l6.045-16.222a.75.75 0 0 1 .705-.488.75.75 0 0 1 .698.51l2.842 8.49h3.21v1.5h-3.75a.75.75 0 0 1-.712-.51L15.75 5.25 9.705 21.263A.75.75 0 0 1 9 21.75"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgHealth);
export default Memo;
