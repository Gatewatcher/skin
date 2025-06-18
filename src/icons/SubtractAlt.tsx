import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgSubtractAlt = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 3c4.95 0 9 4.05 9 9s-4.05 9-9 9-9-4.05-9-9 4.05-9 9-9m0-1.5C6.225 1.5 1.5 6.225 1.5 12S6.225 22.5 12 22.5 22.5 17.775 22.5 12 17.775 1.5 12 1.5"
      fill="currentColor"
    />
    <path d="M18 11.25H6v1.5h12z" fill="currentColor" />
  </svg>
);
const Memo = memo(SvgSubtractAlt);
export default Memo;
