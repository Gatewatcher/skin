import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgContentDeliveryNetwork = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 17 17"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11 11.626a1 1 0 1 0 0-2 1 1 0 0 0 0 2M4 4.626a1 1 0 1 0 0-2 1 1 0 0 0 0 2M14 15.626a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0-3a1 1 0 1 0 0 2 1 1 0 0 0 0-2"
      fill="currentColor"
    />
    <path
      d="M15.5 8.126a7.02 7.02 0 0 0-7-7 6.5 6.5 0 0 0-3.4.9l.55.85q.586-.282 1.2-.5a12.6 12.6 0 0 0-1.35 5.25h-3a5.6 5.6 0 0 1 .7-2.35l-.75-.65a6.9 6.9 0 0 0-.95 3.5 7 7 0 0 0 7 7 6.7 6.7 0 0 0 2.6-.5l-.3-.95c-.82.35-1.71.504-2.6.45a10.54 10.54 0 0 1-1.7-5.5h8.95q.062-.247.05-.5m-8.6 5.8a6.5 6.5 0 0 1-2.65-1.55 6.25 6.25 0 0 1-1.75-3.75h3a12.5 12.5 0 0 0 1.4 5.3m-.4-6.3c.04-1.95.61-3.851 1.65-5.5h.7c1.04 1.649 1.61 3.55 1.65 5.5zm5 0a11.64 11.64 0 0 0-1.4-5.3 6.05 6.05 0 0 1 4.35 5.3z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgContentDeliveryNetwork);
export default Memo;
