import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgSendFilled = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 19 18"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18.088 8.333 1.587.083a.75.75 0 0 0-.81.09.75.75 0 0 0-.248.75L2.518 8.25H11v1.5H2.518L.5 17.055a.75.75 0 0 0 .75.945.75.75 0 0 0 .338-.082l16.5-8.25a.75.75 0 0 0 0-1.335"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgSendFilled);
export default Memo;
