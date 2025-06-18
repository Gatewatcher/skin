import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgBurgerMenu = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M21 4.5H3V6h18zM21 18H3v1.5h18zM21 9H3v1.5h18zM21 13.5H3V15h18z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgBurgerMenu);
export default Memo;
