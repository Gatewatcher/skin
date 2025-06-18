import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgNetwork3 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19.5 16.5c-.53.003-1.049.15-1.5.427l-2.318-2.325a4.5 4.5 0 0 0 0-5.204L18 7.073c.451.277.97.424 1.5.427a3 3 0 1 0-3-3c.003.53.15 1.049.427 1.5l-2.325 2.318a4.5 4.5 0 0 0-5.204 0L7.073 6c.277-.451.424-.97.427-1.5a3 3 0 1 0-3 3A2.9 2.9 0 0 0 6 7.072l2.318 2.326a4.5 4.5 0 0 0 0 5.204L6 16.928a2.9 2.9 0 0 0-1.5-.427 3 3 0 1 0 3 3 2.9 2.9 0 0 0-.428-1.5l2.326-2.318a4.5 4.5 0 0 0 5.204 0L16.928 18c-.276.451-.424.97-.427 1.5a3 3 0 1 0 3-3M12 15a3 3 0 1 1 0-5.999A3 3 0 0 1 12 15"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgNetwork3);
export default Memo;
