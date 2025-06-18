import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgClose = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19 6.225 17.775 5 12 10.775 6.225 5 5 6.225 10.775 12 5 17.775 6.225 19 12 13.225 17.775 19 19 17.775 13.225 12z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgClose);
export default Memo;
