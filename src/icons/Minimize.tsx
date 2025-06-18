import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgMinimize = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.204 2.95h-.05v9.1H23.3v-9.1H12.204ZM.75 2.95H.7v18.1h22.6v-7.6h-1.6v6H2.3V4.55h8.25v-1.6H.75Zm13.004 1.6H21.7v5.9h-7.946z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={0.1}
    />
  </svg>
);
const Memo = memo(SvgMinimize);
export default Memo;
