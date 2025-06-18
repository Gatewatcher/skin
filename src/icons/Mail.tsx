import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgMail = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M21 4.5H3A1.5 1.5 0 0 0 1.5 6v12A1.5 1.5 0 0 0 3 19.5h18a1.5 1.5 0 0 0 1.5-1.5V6A1.5 1.5 0 0 0 21 4.5M19.35 6 12 11.085 4.65 6zM3 18V6.683l8.573 5.932a.75.75 0 0 0 .854 0L21 6.683V18z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgMail);
export default Memo;
